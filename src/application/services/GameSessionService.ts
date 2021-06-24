import {inject, injectable} from "inversify";
import {TYPES} from "../../inversify.types";
import {GameSessionRepository} from "../persistence/GameSessionRepository";
import {GameSession} from "../domain/GameSession";

@injectable()
export class GameSessionService {
    constructor(
        @inject(TYPES.GameSessionRepository) private readonly sessionRepository: GameSessionRepository
    ) {
    }

    async initializeGameSession(): Promise<GameSession> {
        const gameSession = GameSession.create();
        await this.sessionRepository.save(gameSession);
        return gameSession;
    }

    async retrieveGameSession(gameSessionId: string): Promise<GameSession> {
        return await this.sessionRepository.load(gameSessionId);
    }
}
