import {Request, Response} from "express";
import {ResponseMapper} from "./ResponseMapper";
import {injectable} from "inversify";
import {GameSessionService} from "../../application/services/GameSessionService";

@injectable()
export class SessionController {
    constructor(
        private readonly gameSessionService: GameSessionService,
        private readonly responseMapper: ResponseMapper,
    ) {}

    async initializeGameSession(req: Request, res: Response) {
        const result = await this.gameSessionService.initializeGameSession();
        res.status(201).send(this.responseMapper.mapToGameSessionResponse(result));
    }

    async retrieveGameSession(req: Request, res: Response) {
        const result = await this.gameSessionService.retrieveGameSession(req.params.gameSessionId);
        res.status(200).send(this.responseMapper.mapToGameSessionResponse(result));
    }
}
