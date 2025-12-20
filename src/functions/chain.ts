import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { ChainDocument, CreateChainRequest } from '../types/chain.types';
import { createChain } from '../services/chain.service';
import { findAll } from '../repository/chain.repository';
import { withBodyValidation } from '../HOFs/withBodyValidation';
import { createChainSchema } from '../schemas/chain.schema';
import {
    createdResponse,
    httpErrorResponse,
    internalErrorResponse,
    okResponse,
} from '../utils/apiResponse';
import { HttpError } from '../errors/HttpError';

const chainGetAll = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);

        const chains = await findAll();

        return okResponse({ data: chains });
    } catch (error) {
        context.error('Error processing chainGetAll request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

const chainPost = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const chainRequest = (await request.json()) as CreateChainRequest;

        const createdChain: ChainDocument = await createChain(chainRequest);

        return createdResponse({ data: createdChain });
    } catch (error) {
        context.error('Error processing chainPost request:', error);
        if (error instanceof HttpError) return httpErrorResponse(error);
        return internalErrorResponse();
    }
};

app.http('chainGetAll', {
    methods: ['GET'],
    authLevel: 'admin',
    route: 'chain',
    handler: chainGetAll,
});

app.http('chainPost', {
    methods: ['POST'],
    authLevel: 'admin',
    route: 'chain',
    handler: withBodyValidation(createChainSchema)(chainPost),
});
