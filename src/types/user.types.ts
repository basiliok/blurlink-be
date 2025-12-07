export interface CreateUserRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDocument extends User {
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

export interface UserWithoutPassword extends Omit<UserDocument, 'passwordHash'> {}
