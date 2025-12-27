import { CreateLinkRequest, Link, LinkDocument } from '../types/link.types';
import { HttpError } from '../errors/HttpError';
import { insert } from '../repository/link.repository';
import { findById } from '../repository/chain.repository';
import { v4 as uuidv4 } from 'uuid';

export const createLink = async (linkRequest: CreateLinkRequest): Promise<LinkDocument> => {
    const existingChain = await findById(linkRequest.chainId, linkRequest.spaceId);
    if (!existingChain) throw new HttpError('Chain not found', 404);

    const link: Link = {
        id: uuidv4(),
        userId: existingChain.userId,
        ...linkRequest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(link);
};
