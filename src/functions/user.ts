import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { CreateUserRequest, UserDocument } from '../types/user.types';
import { createUser } from '../services/user.service';

const userPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const body = (await request.json()) as CreateUserRequest;

        if (!body.email || !body.password) {
            return { status: 400, jsonBody: 'Email and password are required' };
        }

        const createdUser: UserDocument = await createUser(body);

        const { passwordHash, ...userResponse } = createdUser;

        return { status: 201, jsonBody: userResponse };
    } catch (error) {
        context.error('Error processing userPost request:', error);
        return { status: 500, jsonBody: 'Internal Server Error' };
    }
};

app.http('userPost', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user',
    handler: userPost,
});
