import { Request, Response, NextFunction } from 'express';

const AUTH_TOKEN = 'Password123';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token || token !== AUTH_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    next();
};

