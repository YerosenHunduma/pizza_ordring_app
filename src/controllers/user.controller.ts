import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import pool from '../config/dbConfig';
import { validateUserWithConfirmation } from '../validator/zodValidator';
import { errorHandler } from '../utils/errorHandler';
import { hashedPassword } from '../utils/hashPassword';
import { issueJWT } from '../utils/issueJwtToken';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        const validation = validateUserWithConfirmation(req.body);

        if (!validation.success) {
            const errors = validation.error.issues.map((issue) => {
                const path = issue.path[0];
                let message = issue.message;

                if (message === 'Required') {
                    message = `${path} is required`;
                }

                return { path, message };
            });

            const errorMessage = errors.map((err) => err.message);
            return next(new errorHandler(errorMessage[0], 400));
        }

        const { email, password, phone_number, location, role = 'customer' } = req.body;

        const hashedP = await hashedPassword(password);

        const result = await pool.query(
            `INSERT INTO users ( email, password, phone_number, location, role) VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [email, hashedP, phone_number, location, role]
        );

        res.status(201).json({ message: 'User Registered successfully' });
    } catch (error) {
        next(error);
    }
};

export const registerRestManager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, restaurant_name, logo, email, password, phone_number, location, role = 'manager' } = req.body;

        const user = await pool.query(
            `INSERT INTO users (name, email, password, phone_number, location, role) VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name, email, password, phone_number, location, role]
        );
        const owner_id = user.rows[0].id;

        const restaurant = await pool.query(`INSERT INTO restaurants (restaurant_name,address,logo,owner_id) VALUES ($1, $2, $3, $4) RETURNING *`, [restaurant_name, location, logo, owner_id]);

        res.status(201).json({ user: user.rows[0], restaurant: restaurant.rows[0] });
    } catch (error: any) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: error.message });
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const userQuery = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (userQuery.rowCount === 0) {
            console.log('object');
            return next(new errorHandler('Invalid email or password', 400));
        }

        const user = userQuery.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new errorHandler('Invalid email or password', 401));
        }

        const token = issueJWT(user);

        const { password: pass, ...userInfo } = user;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ userInfo });
    } catch (error) {
        next(error);
    }
};
