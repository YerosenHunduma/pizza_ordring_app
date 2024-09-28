import { z } from 'zod';
import { userProps } from '../utils/types';

export const userSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email' })
        .max(50, { message: 'Email must not exceed 50 characters' })
        .transform((email) => email.toLowerCase().trim()),
    phone_number: z.string().trim().min(10, { message: 'Phone number must be at least 10 characters long' }).max(20, { message: 'Phone number must not exceed 20 characters' }),
    location: z.string().trim().min(1, { message: 'Location is required' }).max(50, { message: 'Location must not exceed 50 characters' }),
    role: z.enum(['customer', 'manager', 'super-admin']).default('customer'),
    password: z
        .string()
        .min(8, { message: 'Password must be 8+ characters long' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),

    confirm_password: z.string()
});

export const validateUserWithConfirmation = (userData: userProps) => {
    const result = userSchema.safeParse(userData);

    if (!result.success) {
        return result;
    }

    if (userData.password !== userData.confirm_password) {
        return {
            success: false,
            error: {
                issues: [
                    {
                        path: ['confirm_password'],
                        message: 'Passwords must match'
                    }
                ]
            }
        };
    }

    return result;
};
