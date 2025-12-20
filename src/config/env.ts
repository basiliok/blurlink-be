import { HttpError } from '../errors/HttpError';

const _getRequiredEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new HttpError(`Missing required environment variable: ${key}`, 500);
    }
    return value;
};

export const env = {
    cosmos: {
        endpoint: _getRequiredEnv('COSMOSDB_ENDPOINT'),
        key: _getRequiredEnv('COSMOSDB_KEY'),
        databaseId: _getRequiredEnv('COSMOSDB_DATABASE_ID'),
        chainContainerId: _getRequiredEnv('COSMOSDB_CHAIN_CONTAINER_ID'),
        linkContainerId: _getRequiredEnv('COSMOSDB_LINK_CONTAINER_ID'),
        userContainerId: _getRequiredEnv('COSMOSDB_USER_CONTAINER_ID'),
    },
    jwt: {
        secret: _getRequiredEnv('JWT_SECRET'),
        expiresIn: _getRequiredEnv('JWT_EXPIRES_IN'),
        issuer: _getRequiredEnv('JWT_ISSUER'),
    },
    bcrypt: {
        saltRounds: Number(_getRequiredEnv('BCRYPT_SALT_ROUNDS')),
    },
} as const;
