import {Column, Entity, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import {GameSession} from "./GameSession";

@Entity("cards")
export class Card {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    owner: string;

    @Column()
    card: string;

    @ManyToOne(() => GameSession, gameSession => gameSession.cards)
    @JoinColumn({name: "game_session_id"})
    gameSession: GameSession;
}
