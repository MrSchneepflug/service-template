import {Card} from "../../../application/domain/Card";

export interface GameSessionResponse {
    readonly id: string;
    readonly done: boolean;
    readonly cards: Card[];
}
