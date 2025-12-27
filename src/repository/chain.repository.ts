import { FeedResponse, ItemDefinition, ItemResponse } from '@azure/cosmos';
import { containers } from '../config/cosmosdb.config';
import { Chain, ChainDocument } from '../types/chain.types';

export const findById = async (id: string, spaceId: string): Promise<ChainDocument | null> => {
    const { resource: chain }: ItemResponse<ItemDefinition> = await containers.chain
        .item(id, spaceId)
        .read();

    if (!chain) return null;

    return chain as ChainDocument;
};

export const findAll = async (): Promise<ChainDocument[]> => {
    const { resources: chains }: FeedResponse<ItemDefinition> = await containers.chain.items
        .readAll()
        .fetchAll();
    return chains as ChainDocument[];
};

export const insert = async (chain: Chain): Promise<ChainDocument> => {
    const { resource: createdChain }: ItemResponse<Chain> = await containers.chain.items.create(chain);
    return createdChain as ChainDocument;
};
