import { AuthDto } from '../dto';
import { Token } from '../types';

export interface IAuthController {
  /**
   * creates a new user
   * @param dto payload
   */
  signupLocal(dto: AuthDto): Promise<Token>;

  /**
   * service to sign an existing user into the portal
   * @param dto payload
   */
  signinLocal(dto: AuthDto): Promise<Token>;

  /**
   * service to log a user out of the portal
   * @param userId payload
   */
  logout(userId: string): Promise<void>;

  /**
   * service to refresh the user access token
   * @param userId payload
   * @param rt the response of the endpoint
   */
  refresh(userId: string, rt: string): Promise<Token>;

  /**
   * service to generate a new access token for the user
   * @param userId payload
   * @param email the response of the endpoint
   */
  generateToken(userId: string, email: string): Promise<Token>;
}
