import { FeedResponse, ItemDefinition, ItemResponse } from '@azure/cosmos';
import { containers } from '../config/cosmosdb.config';
import { User, UserDocument } from '../types/user.types';

export const findById = async (id: string): Promise<UserDocument | null> => {
    const { resource: user }: ItemResponse<ItemDefinition> = await containers.user.item(id, id).read();

    if (!user) return null;

    return user as UserDocument;
};

export const findByEmail = async (email: string): Promise<UserDocument | null> => {
    const query = {
        query: 'SELECT * FROM c WHERE c.email = @email',
        parameters: [{ name: '@email', value: email }],
    };

    const { resources: users }: FeedResponse<ItemDefinition> = await containers.user.items
        .query(query)
        .fetchAll();

    if (users.length === 0) return null;

    return users[0] as UserDocument;
};

export const insert = async (user: User): Promise<UserDocument> => {
    const { resource: createdUser }: ItemResponse<User> = await containers.user.items.create(user);
    return createdUser as UserDocument;
};
