import { insert, findBySlug } from '../repository/space.repository';
import { findById as findUserById } from '../repository/user.repository';
import { Space, SpaceDocument, CreateSpaceRequest } from '../types/space.types';
import { HttpError } from '../errors/HttpError';
import { v4 as uuidv4 } from 'uuid';

export const createSpace = async (spaceRequest: CreateSpaceRequest): Promise<SpaceDocument> => {
    const existingUser = await findUserById(spaceRequest.userId);
    if (!existingUser) throw new HttpError('User not found', 404);

    const existingSpace = await findBySlug(spaceRequest.slug);
    if (existingSpace) throw new HttpError('Space with this slug already exists', 400);

    const space: Space = {
        id: uuidv4(),
        ...spaceRequest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return insert(space);
};
