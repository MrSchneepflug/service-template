import {GameSessionResponse} from "./responses/GameSessionResponse";
import {GameSession} from "../../application/entities/GameSession";
import {injectable} from "inversify";

@injectable()
export class ResponseMapper {
    mapToGameSessionResponse(gameSession: GameSession): GameSessionResponse {
        const {id, players} = gameSession;
        return {id, players}
    }

    mapToErrorResponse(error: Error) {
        return {
            error: error.message
        };
    }
}
