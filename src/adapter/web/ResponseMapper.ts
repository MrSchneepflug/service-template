import {GameSessionResponse} from "./responses/GameSessionResponse";
import {GameSession} from "../../application/entities/GameSession";
import {injectable} from "inversify";
import {CommandError} from "../../application/commands/CommandError";

@injectable()
export class ResponseMapper {
    mapToGameSessionResponse(gameSession: GameSession): GameSessionResponse {
        const {id, players} = gameSession;
        return {id, players}
    }

    mapToErrorResponse(error: CommandError) {
        return {
            error: error.message
        };
    }
}
