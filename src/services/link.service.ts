import { CreateLinkRequest, Link, LinkDocument } from '../types/link.types';
import { v4 as uuidv4 } from 'uuid';
import { insert } from '../repository/link.repository';

export const createLink = async (linkRequest: CreateLinkRequest): Promise<LinkDocument> => {
    const link: Link = {
        id: uuidv4(),
        ...linkRequest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(link);
};
