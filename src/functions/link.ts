import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { LinkDocument, CreateLinkRequest } from '../types/link.types';
import { createLink } from '../services/link.service';
import { findAll } from '../repository/link.repository';

const linkGetAll = async (
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);

        const links = await findAll();

        return { status: 200, body: JSON.stringify(links) };
    } catch (error) {
        context.error('Error processing linkGetAll request:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

const linkPost = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        context.log(`Http function processed request for url "${request.url}"`);
        const body = (await request.json()) as CreateLinkRequest;

        const createdLink: LinkDocument = await createLink(body);

        return { status: 200, body: JSON.stringify(createdLink) };
    } catch (error) {
        context.error('Error processing linkPost request:', error);
        return { status: 500, body: 'Internal Server Error' };
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
    handler: linkPost,
});
