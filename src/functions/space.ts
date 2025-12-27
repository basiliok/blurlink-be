import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { SpaceDocument, CreateSpaceRequest } from '../types/space.types';
import { createSpace } from '../services/space.service';
import { findAll } from '../repository/space.repository';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { createSpaceSchema } from '../schemas/space.schema';
import {
    createdResponse,
    httpErrorResponse,
    internalErrorResponse,
    okResponse,
} from '../utils/apiResponse';
import { HttpError } from '../errors/HttpError';

const spaceGetAll = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);

        const spaces = await findAll();

        return okResponse({ data: spaces });
    } catch (error) {
        context.error('Error processing spaceGetAll request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

const spacePost = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const spaceRequest = (await request.json()) as CreateSpaceRequest;

        const createdSpace: SpaceDocument = await createSpace(spaceRequest);

        return createdResponse({ data: createdSpace });
    } catch (error) {
        context.error('Error processing spacePost request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

app.http('spaceGetAll', {
    methods: ['GET'],
    authLevel: 'admin',
    route: 'space',
    handler: spaceGetAll,
});

app.http('spacePost', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'space',
    handler: withBodyValidation(createSpaceSchema)(spacePost),
});
