import {GameSession} from "../../../application/domain/GameSession";
import {GameSession as GameSessionEntity} from "./entities/GameSession";
import {Card} from "../../../application/domain/Card";
import {Card as CardEntity} from "./entities/Card";
import {injectable} from "inversify";

@injectable()
export class EntityMapper {
    fromGameSession(gameSession: GameSession): GameSessionEntity {
        const gameSessionEntity = new GameSessionEntity();
        gameSessionEntity.id = gameSession.id;
        gameSessionEntity.done = gameSession.done;
        gameSessionEntity.cards = gameSession.cards.map(this.fromCard)
        return gameSessionEntity;
    }

    toGameSession(gameSessionEntity: GameSessionEntity): GameSession {
        return new GameSession(
            gameSessionEntity.id,
            gameSessionEntity.done,
            gameSessionEntity.cards.map(this.toCard),
        );
    }

    fromCard(card: Card): CardEntity {
        const cardEntity = new CardEntity();
        cardEntity.id = card.id;
        cardEntity.owner = card.owner;
        cardEntity.card = card.card
        return cardEntity;
    }

    toCard(cardEntity: CardEntity): Card {
        return new Card(cardEntity.id, cardEntity.owner, cardEntity.card);
    }
}
