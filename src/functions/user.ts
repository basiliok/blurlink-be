import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { CreateUserRequest, UserWithoutPassword } from '../types/user.types';
import { createUser } from '../services/user.service';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { createUserSchema } from '../schemas/user.schema';

const userPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const userRequest = (await request.json()) as CreateUserRequest;

        const createdUser: UserWithoutPassword = await createUser(userRequest);

        return { status: 201, jsonBody: createdUser };
    } catch (error) {
        context.error('Error processing userPost request:', error);
        return { status: 500, jsonBody: 'Internal Server Error' };
    }
};

app.http('userPost', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'user',
    handler: withBodyValidation(createUserSchema)(userPost),
});
