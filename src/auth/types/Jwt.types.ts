export type JwtPayLoad = {
  sub: string;
  email: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayloadWithRt = JwtPayLoad & { refreshToken: string };
