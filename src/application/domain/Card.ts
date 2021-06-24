import {uuid} from "../util/util";

export class Card {
    constructor(
        readonly id: string,
        readonly owner: string,
        readonly card: string,
    ) {
    }

    static create(owner: string, card: string) {
        return new Card(uuid(), owner, card);
    }
}
