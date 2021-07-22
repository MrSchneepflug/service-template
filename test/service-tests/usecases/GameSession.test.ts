import {setup, teardown} from "../setup";
import {ApiActor} from "../actors/ApiActor";
import {PersistenceActor} from "../actors/PersistenceActor";
import {someGameSession} from "../../data/GameSession";
import {uuid} from "../../../src/application/util/util";
import {someCard} from "../../data/Card";

describe("game sessions", () => {
    let apiActor: ApiActor, persistenceActor: PersistenceActor;

    beforeAll(async () => {
        const testUtils = await setup();
        apiActor = testUtils.apiActor;
        persistenceActor = testUtils.persistenceActor;
    });

    afterAll(async () => await teardown());
    afterEach(async () => await persistenceActor.clearTables());

    test("will create a new game session with all provided players", async () => {
         const {status, data: {id}} = await apiActor.initializeGameSession();

        expect(status).toEqual(201);
        expect(id).toBeDefined();
    });

    test("will retrieve an already initialized game session", async () => {
        const gameSessionId = uuid();
        const gameSession = someGameSession({
            id: gameSessionId,
            done: true,
            cards: [
                someCard({owner: "player", card: "🂽"}),
                someCard({owner: "player", card: "🂱"}),
                someCard({owner: "dealer", card: "🂪"}),
                someCard({owner: "dealer", card: "🂩"}),
                someCard({owner: "dealer", card: "🃍"}),
            ],
        });

        await persistenceActor.withGameSession(gameSession);

        const {status, data: {id, done, cards}} = await apiActor.retrieveGameSession(gameSessionId)

        expect(status).toEqual(200);
        expect(id).toEqual(gameSessionId);
        expect(done).toBe(true);
        expect(cards).toHaveLength(5);
        expect(cards).toMatchObject([
            {owner: "player", card: "🂽"},
            {owner: "player", card: "🂱"},
            {owner: "dealer", card: "🂪"},
            {owner: "dealer", card: "🂩"},
            {owner: "dealer", card: "🃍"},
        ])
    });

    test("will respond with an error object if session was not found", async () => {
        const someUnavailableGameSessionId = uuid();
        const {status, data: {error}} = await apiActor.retrieveGameSession(someUnavailableGameSessionId);

        expect(status).toEqual(404);
        expect(error).toBeDefined();
    });
});
