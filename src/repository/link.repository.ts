import { FeedResponse, ItemDefinition, ItemResponse } from '@azure/cosmos';
import { containers } from '../config/cosmosdb.config';
import { Link, LinkDocument } from '../types/link.types';

export const findAll = async (): Promise<LinkDocument[]> => {
    const { resources: links }: FeedResponse<ItemDefinition> = await containers.link.items.readAll().fetchAll();
    return links as LinkDocument[];
};

export const insert = async (link: Link): Promise<LinkDocument> => {
    const { resource: createdLink }: ItemResponse<Link> = await containers.link.items.create(link);
    return createdLink as LinkDocument;
};
