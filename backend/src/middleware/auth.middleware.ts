import { Injectable, NestMiddleware } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { type, countryCode } = req.body;
    if (type != 'ads') {
      delete req.body.countryCode;
      return next();
    }
    try {
      const axiosConfing: AxiosRequestConfig = {
        params: {
          countryCode,
        },
        auth: {
          username: process.env.AUTH_FUN7_USER,
          password: process.env.AUTH_FUN7_PASS,
        },
      };
      const response = await axios.get(
        'https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner',
        axiosConfing,
      );

      if (response.status === 200 && response.data.ads === 'sure, why not!') {
        delete req.body.countryCode;
        return next();
      } else {
        return res.status(403).json({ message: 'Access Forbidden' });
      }
    } catch (err: any) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
