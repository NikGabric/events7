import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await axios.get(
        'https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner',
        {
          params: {
            ...req.body,
          },
          auth: {
            username: process.env.AUTH_FUN7_USER,
            password: process.env.AUTH_FUN7_PASS,
          },
        },
      );

      if (response.status === 200 && response.data.ads === 'sure, why not!') {
        delete req.body.countryCode;
        next();
      } else {
        res.status(403).json({ message: 'Access Forbidden' });
      }
    } catch (err: any) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
