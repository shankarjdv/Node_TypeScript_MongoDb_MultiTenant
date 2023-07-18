import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksRsa, { JwksClient } from "jwks-rsa";
import tenantList, { ITenant } from "../config/tenantInfo";

// Define a custom request interface to extend the default Request object from Express.js
interface CustomRequest extends Request {
  tokenPayload?: any;
}

// Define a type alias for the function that resolves the signing key
type SigningKeyResolver = (
  header: JwtHeader,
  callback: SigningKeyCallback
) => void;

// Export a middleware function to verify a JWT token
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  // Create a new JWKS client
  const jwksClient = jwksRsa({
    jwksUri: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 36000000,
  });

  // Define a function that fetches the signing key based on the JWT header
  const getKey: SigningKeyResolver = (
    header: JwtHeader,
    callback: SigningKeyCallback
  ) => {
    jwksClient.getSigningKey(header.kid, (err, key) => {
      console.log("err=======>", err);
      if (err) {
        return callback(err, undefined);
      }
      console.log("key=======>", key);
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  };

  // Verify the JWT
  jwt.verify(token, getKey, (err, decoded) => {
    console.log("err=======>", err);
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    // If the decoded payload is a string, it's not valid so return an error
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    // Check if the tenant in the decoded token exists in the tenant list
    if (
      tenantList.some((tenant: ITenant) => tenant.tenantId === decoded?.tid)
    ) {
      // If yes, then the token is valid. Attach the decoded token to the request object and proceed to the next middleware
      req.tokenPayload = decoded;
      req.tokenPayload.userRole = ["Admin"];
      console.log("decoded token in authCheck", decoded);
      next();
    } else {
      // If not, return an error
      return res.status(401).json({ message: "Failed to authenticate token." });
    }
  });
};
