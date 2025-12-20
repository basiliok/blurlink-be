import { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { AzureFunction, WithBodyValidation } from '../types/hof.types';
import { z } from 'zod';
import { zodErrorResponse, internalErrorResponse, badRequestResponse } from '../utils/apiResponse';

export const withBodyValidation: WithBodyValidation =
    (schema: z.ZodTypeAny) =>
    (nextFunction: AzureFunction) =>
    async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        try {
            const requestBodyText = await request.text();

            if (!requestBodyText) {
                return badRequestResponse('Request body is required');
            }

            const requestForValidation = _recreateHttpRequest(request, requestBodyText);
            const bodyParams = await requestForValidation.json();

            schema.parse(bodyParams);

            const newRequest = _recreateHttpRequest(request, requestBodyText);
            return nextFunction(newRequest, context);
        } catch (error) {
            context.error('Error in withBodyValidation:', error);
            if (error instanceof z.ZodError) return zodErrorResponse(error);

            return internalErrorResponse();
        }
    };

const _recreateHttpRequest = (originalRequest: HttpRequest, bodyText: string): HttpRequest => {
    const headersRecord: Record<string, string> = {};
    originalRequest.headers.forEach((value, key) => {
        headersRecord[key] = value;
    });

    const queryRecord: Record<string, string> = {};
    originalRequest.query.forEach((value, key) => {
        queryRecord[key] = value;
    });

    return new HttpRequest({
        method: originalRequest.method,
        url: originalRequest.url,
        body: {
            string: bodyText,
        },
        headers: headersRecord,
        query: queryRecord,
        params: originalRequest.params,
    });
};
