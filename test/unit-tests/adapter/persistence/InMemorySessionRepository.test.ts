import {InMemorySessionRepository} from "../../../../src/adapter/persistence/InMemorySessionRepository";
import {someGameSession} from "../../../data/GameSession";
import {uuid} from "../../../../src/application/util/util";

test("it will store and retrieve game sessions", () => {
    const gameSessionId = uuid();
    const gameSession = someGameSession({id: gameSessionId});

    const repository = new InMemorySessionRepository();
    expect(() => repository.load(gameSessionId)).toThrow();

    repository.save(gameSession);
    expect(repository.load(gameSessionId)).toBe(gameSession);
});
