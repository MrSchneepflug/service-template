import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Card} from "./Card";

@Entity("game_sessions")
export class GameSession {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    done: boolean;

    @OneToMany(() => Card, card => card.gameSession, {cascade: true})
    cards: Card[];
}
