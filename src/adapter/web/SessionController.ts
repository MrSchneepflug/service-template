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

    initializeGameSession(req: Request, res: Response) {
        const {playerNames} = req.body;
        let result;

        try {
            result = this.gameSessionService.initializeGameSession(playerNames);
            res.status(201).send(this.responseMapper.mapToGameSessionResponse(result));
        } catch (error) {
            res.status(400).send(this.responseMapper.mapToErrorResponse(error));
        }
    }

    retrieveGameSession(req: Request, res: Response) {
        const gameSessionId = req.params.gameSessionId;
        let result;

        try {
            result = this.gameSessionService.retrieveGameSession(gameSessionId);
            res.status(200).send(this.responseMapper.mapToGameSessionResponse(result));
        } catch (error) {
            res.status(400).send(this.responseMapper.mapToErrorResponse(error));
        }
    }
}
