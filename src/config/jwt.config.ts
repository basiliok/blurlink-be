const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const jwtIssuer = process.env.JWT_ISSUER;

export const jwtConfig = {
    secret: jwtSecret,
    expiresIn: jwtExpiresIn,
    issuer: jwtIssuer,
};
