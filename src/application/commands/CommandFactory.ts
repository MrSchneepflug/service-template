import {inject, injectable} from "inversify";
import {TYPES} from "../../inversify.types";
import {EventBus} from "../events/EventBus";
import {SessionRepository} from "../persistence/SessionRepository";
import {InitializeGameSessionCommand} from "./domain/InitializeGameSessionCommand";
import {RetrieveGameSessionCommand} from "./domain/RetrieveGameSessionCommand";

@injectable()
export class CommandFactory {
    constructor(
        @inject(TYPES.SessionRepository) private readonly sessionRepository: SessionRepository,
        private readonly eventBus: EventBus,
    ) {}

    createInitializeGameSessionCommand(playerNames: ReadonlyArray<string>) {
        return new InitializeGameSessionCommand(playerNames, this.sessionRepository);
    }

    createRetrieveGameSessionCommand(gameSessionId: string) {
        return new RetrieveGameSessionCommand(gameSessionId, this.sessionRepository);
    }
}
