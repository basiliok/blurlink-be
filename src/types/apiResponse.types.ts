export enum ERROR_CODES {
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    HTTP_ERROR = 'HTTP_ERROR',
}

export type ErrorCode = ERROR_CODES;

export interface ApiResponseBody {
    success: boolean;
    data?: any;
    error?: {
        code: ErrorCode;
        message: string;
        details?: any;
    };
}

export interface SuccessResponseParams {
    statusCode: number;
    data?: any;
}

export interface ErrorResponseParams {
    statusCode: number;
    errorBody: {
        code: ErrorCode;
        message: string;
        details?: any;
    };
}
