import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { ChainDocument, CreateChainRequest } from '../types/chain.types';
import { createChain } from '../services/chain.service';
import { findAll } from '../repository/chain.repository';

const chainGetAll = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);

        const chains = await findAll();

        return { status: 200, body: JSON.stringify(chains) };
    } catch (error) {
        context.error('Error processing chainGetAll request:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

const chainPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const body = (await request.json()) as CreateChainRequest;

        const createdChain: ChainDocument = await createChain(body);

        return { status: 200, body: JSON.stringify(createdChain) };
    } catch (error) {
        context.error('Error processing chainPost request:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('chainGet', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'chain',
    handler: chainGetAll,
});

app.http('chainPost', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'chain',
    handler: chainPost,
});
