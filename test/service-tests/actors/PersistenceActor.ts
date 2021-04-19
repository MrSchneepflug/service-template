import {SessionRepository} from "../../../src/application/persistence/SessionRepository";
import {GameSession} from "../../../src/application/entities/GameSession";
import {someGameSession} from "../../data/GameSession";

export class PersistenceActor {
    constructor(private readonly sessionRepository: SessionRepository) {}

    withGameSession(gameSession: GameSession = someGameSession()) {
        this.sessionRepository.save(gameSession);
    }
}
