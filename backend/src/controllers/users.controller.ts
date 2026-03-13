import { Request, Response } from 'express';
import { User } from '@aws-ec2-deploy/types';

const mockUser: User = {
  id: '1',
  name: 'Mock User',
  email: 'mock.user@example.com',
};

export const getUsers = (_request: Request, response: Response): void => {
  response.status(200).json({ data: [mockUser] });
};
