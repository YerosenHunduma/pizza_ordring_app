import jwt from 'jsonwebtoken';
interface userProps {
    id: number;
    name: null;
    email: string;
    phone_number: string;
    role: string;
    location: string;
    created_at: string;
}
export const issueJWT = (user: userProps) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!);
};
