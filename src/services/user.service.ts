import { v4 as uuidv4 } from 'uuid';
import { insert, findByEmail } from '../repository/user.repository';
import { User, UserDocument, CreateUserRequest, UserWithoutPassword } from '../types/user.types';
import { env } from '../config/env';
import { HttpError } from '../errors/HttpError';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
    const user = await findByEmail(email);
    if (!user) throw new HttpError('User not found');

    return user;
};

export const createUser = async (userRequest: CreateUserRequest): Promise<UserWithoutPassword> => {
    const existingUser = await findByEmail(userRequest.email);
    if (existingUser) throw new HttpError('User with this email already exists', 400);

    const passwordHash = await bcrypt.hash(userRequest.password, env.bcrypt.saltRounds);

    const user: User = {
        id: uuidv4(),
        username: '',
        email: userRequest.email,
        passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const createdUser: UserDocument = await insert(user);

    const { passwordHash: _, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
};

export const authenticateUser = async (email: string, password: string): Promise<string> => {
    const user = await findByEmail(email);
    if (!user) throw new HttpError('User not found', 404);

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) throw new HttpError('Invalid email or password', 401);

    const token = jwt.sign(
        { userId: user.id, username: user.email, iss: env.jwt.issuer },
        env.jwt.secret,
        {
            expiresIn: env.jwt.expiresIn,
        } as jwt.SignOptions,
    );

    return token;
};
