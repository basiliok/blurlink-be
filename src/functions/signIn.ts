import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { LoginRequest } from '../types/auth.types';
import { env } from '../config/env';
import * as jwt from 'jsonwebtoken';

const signIn = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const { username, password } = (await request.json()) as LoginRequest;

        if (username !== 'admin' || password !== 'admin') {
            return { status: 401, jsonBody: 'Invalid username or password' };
        }

        const newToken = jwt.sign(
            { userId: 'user-001', username, iss: env.jwt.issuer },
            env.jwt.secret,
            {
                expiresIn: env.jwt.expiresIn,
            } as jwt.SignOptions,
        );

        return { status: 200, jsonBody: newToken };
    } catch (error) {
        context.error('Error in signIn:', error);
        return { status: 500, jsonBody: 'Internal Server Error' };
    }
};

app.http('signIn', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'sign-in',
    handler: signIn,
});
