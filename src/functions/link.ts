import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { LinkDocument, CreateLinkRequest } from '../types/link.types';
import { createLink } from '../services/link.service';
import { findAll } from '../repository/link.repository';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { createLinkSchema } from '../schemas/link.schema';
import {
    createdResponse,
    httpErrorResponse,
    internalErrorResponse,
    okResponse,
} from '../utils/apiResponse';
import { HttpError } from '../errors/HttpError';

const linkGetAll = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);

        const links = await findAll();

        return okResponse({ data: links });
    } catch (error) {
        context.error('Error processing linkGetAll request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

const linkPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const linkRequest = (await request.json()) as CreateLinkRequest;

        const createdLink: LinkDocument = await createLink(linkRequest);

        return createdResponse({ data: createdLink });
    } catch (error) {
        context.error('Error processing linkPost request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

app.http('linkGetAll', {
    methods: ['GET'],
    authLevel: 'admin',
    route: 'link',
    handler: linkGetAll,
});

app.http('linkPost', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'link',
    handler: withBodyValidation(createLinkSchema)(linkPost),
});
