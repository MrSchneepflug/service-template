import {Request, Response} from "express";
import {CommandFactory} from "../../application/commands/CommandFactory";
import {CommandProcessor} from "../../application/commands/CommandProcessor";
import {ResponseMapper} from "./ResponseMapper";
import {injectable} from "inversify";
import {isCommandError} from "../../application/util/util";

@injectable()
export class SessionController {
    constructor(
        private readonly commandFactory: CommandFactory,
        private readonly commandProcessor: CommandProcessor,
        private readonly responseMapper: ResponseMapper,
    ) {}

    initializeGameSession(req: Request, res: Response) {
        const command = this.commandFactory.createInitializeGameSessionCommand(req.body.playerNames);
        const result = this.commandProcessor.process(command);

        isCommandError(result)
            ? res.status(400).send(this.responseMapper.mapToErrorResponse(result))
            : res.status(201).send(this.responseMapper.mapToGameSessionResponse(result));
    }

    retrieveGameSession(req: Request, res: Response) {
        const command = this.commandFactory.createRetrieveGameSessionCommand(req.params.gameSessionId);
        const result = this.commandProcessor.process(command);

        isCommandError(result)
            ? res.status(400).send(this.responseMapper.mapToErrorResponse(result))
            : res.status(200).send(this.responseMapper.mapToGameSessionResponse(result));
    }
}
