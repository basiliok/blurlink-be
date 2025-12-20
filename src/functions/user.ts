import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { CreateUserRequest, UserWithoutPassword } from '../types/user.types';
import { createUser } from '../services/user.service';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { createUserSchema } from '../schemas/user.schema';
import { createdResponse, httpErrorResponse, internalErrorResponse } from '../utils/apiResponse';
import { HttpError } from '../errors/HttpError';

const userPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const userRequest = (await request.json()) as CreateUserRequest;

        const createdUser: UserWithoutPassword = await createUser(userRequest);

        return createdResponse({ data: createdUser });
    } catch (error) {
        context.error('Error processing userPost request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

app.http('userPost', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'user',
    handler: withBodyValidation(createUserSchema)(userPost),
});
