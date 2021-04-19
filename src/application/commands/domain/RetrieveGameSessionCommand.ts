import {inject} from "inversify";
import {TYPES} from "../../../inversify.types";
import {SessionRepository} from "../../persistence/SessionRepository";
import {Command} from "../Command";
import {GameSession} from "../../entities/GameSession";

export class RetrieveGameSessionCommand implements Command<GameSession> {
    constructor(
        private readonly gameSessionId: string,
        @inject(TYPES.SessionRepository) private readonly sessionRepository: SessionRepository,
    ) {}

    execute(): GameSession {
        return this.sessionRepository.load(this.gameSessionId);
    }
}
