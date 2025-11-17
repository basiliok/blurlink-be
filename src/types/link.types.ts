export interface CreateLinkRequest {
    chainId: string;
    title: string;
    url: string;
}

export interface Link extends CreateLinkRequest {
    id: string;
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
