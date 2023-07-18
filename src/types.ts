import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    tenantId: string;
    // Add any other properties related to the user or authentication
  };
}
