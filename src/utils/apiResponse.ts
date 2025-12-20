import { HttpResponseInit } from '@azure/functions';
import {
    ERROR_CODES,
    ApiResponseBody,
    SuccessResponseParams,
    ErrorResponseParams,
} from '../types/apiResponse.types';
import { z } from 'zod';
import { HttpError } from '../errors/HttpError';

export const successResponse = ({ statusCode, data }: SuccessResponseParams): HttpResponseInit => {
    const responseBody: ApiResponseBody = {
        success: true,
        data,
    };

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        status: statusCode,
        jsonBody: responseBody,
    };
};

export const errorResponse = ({ statusCode, errorBody }: ErrorResponseParams): HttpResponseInit => {
    const responseBody: ApiResponseBody = {
        success: false,
        error: {
            code: errorBody.code,
            message: errorBody.message,
            details: errorBody.details,
        },
    };

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        status: statusCode,
        jsonBody: responseBody,
    };
};

export const okResponse = ({ data }: { data: any }): HttpResponseInit => {
    return successResponse({ statusCode: 200, data });
};

export const createdResponse = ({ data }: { data: any }): HttpResponseInit => {
    return successResponse({ statusCode: 201, data });
};

export const noContentResponse = (): HttpResponseInit => {
    return successResponse({ statusCode: 204 });
};

export const badRequestResponse = (message?: string, details?: any): HttpResponseInit => {
    return errorResponse({
        statusCode: 400,
        errorBody: {
            code: ERROR_CODES.BAD_REQUEST,
            message: message || 'Bad request',
            details,
        },
    });
};

export const unauthorizedResponse = (message?: string): HttpResponseInit => {
    return errorResponse({
        statusCode: 401,
        errorBody: {
            code: ERROR_CODES.UNAUTHORIZED,
            message: message || 'Unauthorized',
        },
    });
};

export const forbiddenResponse = (message?: string): HttpResponseInit => {
    return errorResponse({
        statusCode: 403,
        errorBody: {
            code: ERROR_CODES.FORBIDDEN,
            message: message || 'Forbidden',
        },
    });
};

export const notFoundResponse = (message?: string): HttpResponseInit => {
    return errorResponse({
        statusCode: 404,
        errorBody: {
            code: ERROR_CODES.NOT_FOUND,
            message: message || 'Resource not found',
        },
    });
};

export const internalErrorResponse = (message?: string, details?: any): HttpResponseInit => {
    return errorResponse({
        statusCode: 500,
        errorBody: {
            code: ERROR_CODES.INTERNAL_ERROR,
            message: message || 'Internal server error',
            details,
        },
    });
};

export const zodErrorResponse = (error: z.ZodError): HttpResponseInit => {
    return badRequestResponse('Validation failed', error.issues);
};

export const httpErrorResponse = (error: HttpError): HttpResponseInit => {
    return errorResponse({
        statusCode: error.statusCode,
        errorBody: {
            code: ERROR_CODES.HTTP_ERROR,
            message: error.message,
        },
    });
};
