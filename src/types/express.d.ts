// src/types/express.d.ts

import express from "express";

declare global {
  namespace Express {
    export interface Request {
      userId?: string; // Add your custom field here.
      pool?: any;
      tokenPayload?: {
        userRole?: string[];
        roles?: string[];
        tid?: string;
      }; // Add your custom field here.
    }
  }
}
