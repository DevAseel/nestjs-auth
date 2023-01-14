import * as dotenv from 'dotenv';
dotenv.config();

export const env = process.env.ENV;
export const databaseUser = process.env.POSTGRES_USER;
export const databasePassword = process.env.POSTGRES_PASSWORD;
export const databaseName = process.env.POSRGRES_DATABASE;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtRefreshSecert = process.env.JWT_REFRESH_SECRET;
export const jwtTokenTtl = process.env.JWT_TOKEN_TTL;
export const jwtRefreshTokenTtl = process.env.JWT_REFRESH_TOKEN_TTL;
