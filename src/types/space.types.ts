export interface CreateSpaceRequest {
    userId: string;
    name: string;
    slug: string;
    note: string;
}

export interface Space extends CreateSpaceRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface SpaceDocument extends Space {
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}
