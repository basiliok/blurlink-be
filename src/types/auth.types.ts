export interface JwtPayload {
    userId: string;
    email: string;
}

export interface AuthToken {
    token: string;
    expiresIn: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string;
        email: string;
    };
    token: AuthToken;
}
