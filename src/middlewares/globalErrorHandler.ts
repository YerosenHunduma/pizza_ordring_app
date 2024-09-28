import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';

interface errType {
    message: string;
    statusCode: number;
    stack: any;
}

interface errType {
    name: string;
    code: string;
    constraint: string;
}

export default (err: errType, req: Request, res: Response, next: NextFunction) => {
    let error = {
        message: err.message || 'Internal server error',
        statusCode: err.statusCode || 500
    };

    if (err?.code === '23505') {
        const field = err.constraint.split('_')[1];
        const message = `This ${field} is already in use. Please choose another ${field}.`;
        error = new errorHandler(message, 400);
    }

    // handle Invalid Jwt error
    if (err?.name === 'JsonWebTokenError') {
        const message = 'Token is invalid, please try again';
        error = new errorHandler(message, 400);
    }

    // handle Expired Jwt error
    if (err?.name === 'TokenExpiredError') {
        const message = 'Token is expired, please try again';
        error = new errorHandler(message, 400);
    }

    if (process.env.NODE_ENV == 'PRODUCTION') {
        res.status(error.statusCode).json(error.message);
    }

    if (process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(error.statusCode).json({ message: error.message, error: err, stack: err?.stack });
    }
};
