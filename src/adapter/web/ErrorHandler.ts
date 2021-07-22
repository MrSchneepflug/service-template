import {injectable} from "inversify";
import {NextFunction, Request, Response} from "express";
import {SessionNotFoundError, SessionNotSavedError} from "../persistence/postgres/Errors";
import {ResponseMapper} from "./ResponseMapper";

@injectable()
export class ErrorHandler {
    constructor(private readonly responseMapper: ResponseMapper) {}

    handle(err: Error, req: Request, res: Response, next: NextFunction) {
        if (res.headersSent) {
            return next(err)
        }

        if (err instanceof SessionNotFoundError) {
            return res.status(404).send(this.responseMapper.mapToErrorResponse(err));
        }

        if (err instanceof SessionNotSavedError) {
            return res.status(500).send(this.responseMapper.mapToErrorResponse(err, err.cause));
        }

        next(err);
    }
}
