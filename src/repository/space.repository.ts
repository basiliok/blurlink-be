import { FeedResponse, ItemDefinition, ItemResponse } from '@azure/cosmos';
import { containers } from '../config/cosmosdb.config';
import { Space, SpaceDocument } from '../types/space.types';

export const findById = async (id: string, userId: string): Promise<SpaceDocument | null> => {
    const { resource: space }: ItemResponse<ItemDefinition> = await containers.space
        .item(id, userId)
        .read();

    if (!space) return null;

    return space as SpaceDocument;
};

export const findAll = async (): Promise<SpaceDocument[]> => {
    const { resources: spaces }: FeedResponse<ItemDefinition> = await containers.space.items
        .readAll()
        .fetchAll();
    return spaces as SpaceDocument[];
};

export const findBySlug = async (slug: string): Promise<SpaceDocument | null> => {
    const query = {
        query: 'SELECT * FROM c WHERE c.slug = @slug',
        parameters: [{ name: '@slug', value: slug }],
    };

    const { resources: spaces }: FeedResponse<ItemDefinition> = await containers.space.items
        .query(query)
        .fetchAll();

    if (spaces.length === 0) return null;

    return spaces[0] as SpaceDocument;
};

export const insert = async (space: Space): Promise<SpaceDocument> => {
    const { resource: createdSpace }: ItemResponse<Space> = await containers.space.items.create(space);
    return createdSpace as SpaceDocument;
};
