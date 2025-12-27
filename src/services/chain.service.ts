import { insert } from '../repository/chain.repository';
import { findById } from '../repository/space.repository';
import { Chain, ChainDocument, CreateChainRequest } from '../types/chain.types';
import { HttpError } from '../errors/HttpError';
import { v4 as uuidv4 } from 'uuid';

export const createChain = async (chainRequest: CreateChainRequest): Promise<ChainDocument> => {
    const existingSpace = await findById(chainRequest.spaceId, chainRequest.userId);
    if (!existingSpace) throw new HttpError('Space not found', 404);

    const chain: Chain = {
        id: uuidv4(),
        ...chainRequest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(chain);
};
