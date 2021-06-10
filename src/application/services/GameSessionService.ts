import {inject, injectable} from "inversify";
import {TYPES} from "../../inversify.types";
import {SessionRepository} from "../persistence/SessionRepository";
import {GameSession} from "../entities/GameSession";

@injectable()
export class GameSessionService {
    constructor(
        @inject(TYPES.SessionRepository) private readonly sessionRepository: SessionRepository
    ) {
    }

    initializeGameSession(playerNames: ReadonlyArray<string>): GameSession {
        const gameSession = GameSession.create(playerNames);
        this.sessionRepository.save(gameSession);
        return gameSession;
    }

    retrieveGameSession(gameSessionId: string): GameSession {
        return this.sessionRepository.load(gameSessionId);
    }
}
