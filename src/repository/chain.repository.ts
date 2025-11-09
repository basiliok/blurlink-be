import { FeedResponse, ItemDefinition, ItemResponse } from '@azure/cosmos';
import { containers } from '../config/cosmosdb.config';
import { Chain, ChainDocument } from '../types/chain.types';

export const findAll = async (): Promise<ChainDocument[]> => {
    const { resources: chains }: FeedResponse<ItemDefinition> = await containers.chain.items.readAll().fetchAll();
    return chains as ChainDocument[];
};

export const insert = async (chain: Chain): Promise<ChainDocument> => {
    const { resource: createdChain }: ItemResponse<Chain> = await containers.chain.items.create(chain);
    return createdChain as ChainDocument;
};
