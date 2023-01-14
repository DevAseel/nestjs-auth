import { env } from './constants';
const cookieTtl = parseInt(process.env.COOKIE_TTL);

const expirationDate = new Date();
// cookie expires in 14 days
expirationDate.setDate(expirationDate.getDate() + cookieTtl);

export const cookieConfig = {
  expires: expirationDate,
  httpOnly: false,
  secure: env === 'production' ? true : false,
};
