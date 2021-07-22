import {GameSessionResponse} from "./responses/GameSessionResponse";
import {GameSession} from "../../application/domain/GameSession";
import {injectable} from "inversify";

@injectable()
export class ResponseMapper {
    mapToGameSessionResponse(gameSession: GameSession): GameSessionResponse {
        const {id, done, cards} = gameSession;
        return {id, done, cards: cards.map(({id, owner, card}) => ({id, owner, card}))}
    }

    mapToErrorResponse(error: Error, cause?: Error) {
        const response = {error: error.message};
        return cause
            ? {...response, cause}
            : response;
    }
}
