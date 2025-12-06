import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { insert, findByEmail } from '../repository/user.repository';
import { User, UserDocument, CreateUserRequest } from '../types/user.types';
import { env } from '../config/env';

export const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
    const user = await findByEmail(email);
    if (!user) throw new Error('User not found');

    return user;
};

export const createUser = async (body: CreateUserRequest): Promise<UserDocument> => {
    const existingUser = await findByEmail(body.email);
    if (existingUser) throw new Error('User with this email already exists');

    const passwordHash = await bcrypt.hash(body.password, env.bcrypt.saltRounds);

    const user: User = {
        id: uuidv4(),
        username: '',
        email: body.email,
        passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(user);
};
