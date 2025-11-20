import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

interface IErrors{
  field:string,
  message:Array<string>
}
export function validateRequest(req: Request, res: Response, next: NextFunction) {

  const valResult = validationResult(req);

  if (!valResult.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: mapError(valResult)
    });
  }

  next();
}

// 
function mapError(valResult:Result<ValidationError>):Array<IErrors>{
  const errMap:Record<string,string[]> = {}

  const errors:Array<IErrors> = []

  valResult.array().forEach((err:any)=>{
    if(!errMap[err.path]) errMap[err.path] =[]
    errMap[err.path].push(err.msg)
  })

  Object.entries(errMap).forEach(([field,message])=>{
    errors.push({field,message})
  })
  return errors
}
