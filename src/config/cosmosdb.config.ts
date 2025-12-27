import { CosmosClient } from '@azure/cosmos';
import { env } from './env';

const cosmosClient = new CosmosClient({
    endpoint: env.cosmos.endpoint,
    key: env.cosmos.key,
});

export const containers = {
    user: cosmosClient.database(env.cosmos.databaseId).container(env.cosmos.userContainerId),
    space: cosmosClient.database(env.cosmos.databaseId).container(env.cosmos.spaceContainerId),
    chain: cosmosClient.database(env.cosmos.databaseId).container(env.cosmos.chainContainerId),
    link: cosmosClient.database(env.cosmos.databaseId).container(env.cosmos.linkContainerId),
};
