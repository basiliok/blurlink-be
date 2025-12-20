import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { LoginRequest } from '../types/auth.types';
import { authenticateUser } from '../services/user.service';
import { signInSchema } from '../schemas/auth.schema';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { httpErrorResponse, internalErrorResponse, okResponse } from '../utils/apiResponse';
import { HttpError } from '../errors/HttpError';

const signIn = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const { email, password } = (await request.json()) as LoginRequest;

        const token = await authenticateUser(email, password);

        return okResponse({ data: { token } });
    } catch (error) {
        context.error('Error in signIn:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

app.http('signIn', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'sign-in',
    handler: withBodyValidation(signInSchema)(signIn),
});
