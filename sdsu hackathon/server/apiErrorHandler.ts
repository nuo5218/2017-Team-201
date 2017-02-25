
import { Request, Response, NextFunction }from 'express';

export function ApiErrorHandler(err:any, req: Request, res: Response, next: NextFunction)
{
    console.log("ERROR");
    res.status(500).json({error:"01",message: err.message});
}