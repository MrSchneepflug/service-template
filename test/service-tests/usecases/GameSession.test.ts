import {setup, teardown} from "../../config/setup";
import {ApiActor} from "../actors/ApiActor";
import {PersistenceActor} from "../actors/PersistenceActor";
import {DEFAULT_PLAYER_NAMES, someGameSession} from "../../data/GameSession";
import {Player} from "../../../src/application/entities/Player";
import {uuid} from "../../../src/application/util/util";

describe("game sessions", () => {
    let apiActor: ApiActor, persistenceActor: PersistenceActor;

    beforeAll(() => {
        const testUtils = setup();
        apiActor = testUtils.apiActor;
        persistenceActor = testUtils.persistenceActor;
    });

    afterAll(teardown);

    test("will create a new game session with all provided players", async () => {
        const {status, data: {players}} = await apiActor.initializeGameSession();

        expect(status).toEqual(201);
        expect(players).toHaveLength(2);
        expect(players.map((player: Player) => player.name)).toEqual(DEFAULT_PLAYER_NAMES);
    });

    test("will retrieve an already initialized game session", async () => {
        const gameSessionId = uuid();
        persistenceActor.withGameSession(someGameSession({id: gameSessionId}));

        const {status, data: {id, players}} = await apiActor.retrieveGameSession(gameSessionId)

        expect(status).toEqual(200);
        expect(id).toEqual(gameSessionId);
        expect(players).toHaveLength(2);
        expect(players.map((player: Player) => player.name)).toEqual(DEFAULT_PLAYER_NAMES);
    });
});
