import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { LoginRequest } from '../types/auth.types';
import { authenticateUser } from '../services/user.service';

const signIn = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const { username, password } = (await request.json()) as LoginRequest;

        const token = await authenticateUser(username, password);

        return { status: 200, jsonBody: { token } };
    } catch (error) {
        context.error('Error in signIn:', error);
        return { status: 500, jsonBody: { message: 'Internal Server Error' } };
    }
};

app.http('signIn', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'sign-in',
    handler: signIn,
});
