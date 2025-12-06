export const env = {
    cosmos: {
        endpoint: process.env.COSMOSDB_ENDPOINT,
        key: process.env.COSMOSDB_KEY,
        databaseId: process.env.COSMOSDB_DATABASE_ID,
        chainContainerId: process.env.COSMOSDB_CHAIN_CONTAINER_ID,
        linkContainerId: process.env.COSMOSDB_LINK_CONTAINER_ID,
        userContainerId: process.env.COSMOSDB_USER_CONTAINER_ID,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        issuer: process.env.JWT_ISSUER,
    },
    bcrypt: {
        saltRounds: process.env.BCRYPT_SALT_ROUNDS,
    },
} as const;
