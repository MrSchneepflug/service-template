import {uuid} from "../../src/application/util/util";
import {Card} from "../../src/application/domain/Card";

export function someCard(overrides: Partial<Card> = {}): Card {
    const defaults = {
        id: uuid(),
        owner: "player",
        card: "🂽",
    };

    const values = {...defaults, ...overrides}
    return new Card(values.id, values.owner, values.card);
}
