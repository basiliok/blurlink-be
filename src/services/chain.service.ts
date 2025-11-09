import { insert } from '../repository/chain.repository';
import { Chain, ChainDocument, CreateChainRequest } from '../types/chain.types';
import { v4 as uuidv4 } from 'uuid';

export const createChain = async (body: CreateChainRequest): Promise<ChainDocument> => {
    const chain: Chain = {
        id: uuidv4(),
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(chain);
};
