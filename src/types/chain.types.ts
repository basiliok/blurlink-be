export interface CreateChainRequest {
    userId: string;
    spaceId: string;
    chainName: string;
    position: number;
    width: number;
    height: number;
    linkStyle: 'classic' | 'modern' | 'minimal';
    linkDirection: 'horizontal' | 'vertical';
    linkSize: 'small' | 'medium' | 'large';
    note: string;
}

export interface Chain extends CreateChainRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChainDocument extends Chain {
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}
