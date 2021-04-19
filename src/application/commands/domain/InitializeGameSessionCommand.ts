import {inject} from "inversify";
import {TYPES} from "../../../inversify.types";
import {SessionRepository} from "../../persistence/SessionRepository";
import {Command} from "../Command";
import {GameSession} from "../../entities/GameSession";

export class InitializeGameSessionCommand implements Command<GameSession> {
    constructor(
        private readonly playerNames: ReadonlyArray<string>,
        @inject(TYPES.SessionRepository) private readonly sessionRepository: SessionRepository,
    ) {}

    execute(): GameSession {
        const gameSession = GameSession.create(this.playerNames);
        this.sessionRepository.save(gameSession);
        return gameSession;
    }
}
