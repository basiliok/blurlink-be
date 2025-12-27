export interface CreateLinkRequest {
    spaceId: string;
    chainId: string;
    title: string;
    url: string;
    note: string;
}

export interface Link extends CreateLinkRequest {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface LinkDocument extends Link {
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}
