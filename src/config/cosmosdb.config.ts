import { CosmosClient } from '@azure/cosmos';

const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;
const databaseId = process.env.COSMOSDB_DATABASE_ID;
const chainContainerId = process.env.COSMOSDB_CHAIN_CONTAINER_ID;
const linkContainerId = process.env.COSMOSDB_LINK_CONTAINER_ID;

const cosmosClient = new CosmosClient({ endpoint, key });

export const containers = {
    chain: cosmosClient.database(databaseId).container(chainContainerId),
    link: cosmosClient.database(databaseId).container(linkContainerId),
};
