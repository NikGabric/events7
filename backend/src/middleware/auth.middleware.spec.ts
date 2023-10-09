import { AuthMiddleware } from './auth.middleware';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    authMiddleware = new AuthMiddleware();
    req = {} as Partial<Request>;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();

    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should delete countryCode when type is not "ads"', async () => {
    req.body = { type: 'other', countryCode: 'US' };

    await authMiddleware.use(req as Request, res as Response, next);

    expect(req.body.countryCode).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('should handle successful external service response', async () => {
    req.body = { type: 'ads', countryCode: 'US' };

    mockAxios
      .onGet('https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner')
      .reply(200, {
        ads: 'sure, why not!',
      });

    await authMiddleware.use(req as Request, res as Response, next);

    expect(req.body.countryCode).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('should handle unsuccessful external service response', async () => {
    req.body = { type: 'ads', countryCode: 'US' };

    mockAxios
      .onGet('https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner')
      .reply(200, { ads: 'you shall not pass!' });

    await authMiddleware.use(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle external service error', async () => {
    req.body = { type: 'ads', countryCode: 'US' };

    mockAxios
      .onGet('https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner')
      .networkError();

    await authMiddleware.use(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    expect(next).not.toHaveBeenCalled();
  });
});
