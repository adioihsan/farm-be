import "express";

interface userPaylod{
    id:string,
    email:string,
    name:string
}
declare module "express-serve-static-core" {
  interface Request {
    user?: userPaylod;
  }
}