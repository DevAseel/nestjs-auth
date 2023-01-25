import { AuthDto } from '../dto';
import { Token } from '../types';
import { Response } from 'express';

export interface IAuthController {
  /**
   * signupLocal controller
   * @param dto payload
   * @param res the response of the endpoint
   */
  signupLocal(dto: AuthDto, res: Response): Promise<Token>;

  /**
   * siginLocal controller
   * @param dto payload
   * @param res the response of the endpoint
   */
  signinLocal(dto: AuthDto, res: Response): Promise<Token>;

  /**
   * logout controller
   * @param userId user id
   * @param res the response of the endpoint
   */
  logout(userId: string, res: Response): Promise<void>;

  /**
   * refresh controller
   * @param userId user id
   * @param refreshToken the refresh token
   */
  refresh(userId: string, refreshToken: string): Promise<Token>;
}
