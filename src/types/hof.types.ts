import { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { z } from 'zod';

export type AzureFunction = (
    request: HttpRequest,
    context: InvocationContext,
) => Promise<HttpResponseInit>;

export type WithBodyValidation = (
    schema: z.ZodTypeAny,
) => (nextFunction: AzureFunction) => AzureFunction;
