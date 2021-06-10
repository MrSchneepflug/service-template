import {Container, interfaces} from "inversify";
import {SessionController} from "./adapter/web/SessionController";
import {EventBus} from "./application/events/EventBus";
import {ResponseMapper} from "./adapter/web/ResponseMapper";
import {TYPES} from "./inversify.types";
import express, {Express} from "express";
import bodyParser from "body-parser";
import {InMemorySessionRepository} from "./adapter/persistence/InMemorySessionRepository";
import {GameSessionService} from "./application/services/GameSessionService";

const container = new Container({defaultScope: "Singleton"});

container.bind(SessionController).toSelf();
container.bind(ResponseMapper).toSelf();

container.bind(GameSessionService).toSelf();

container.bind(EventBus).toSelf().onActivation((context: interfaces.Context, eventBus: EventBus): EventBus => {
    // eventBus.subscribe("ROAD_BUILT", context.container.get(LongestRoadPolicy));
    return eventBus;
});

container.bind<Express>(TYPES.App).toDynamicValue((context: interfaces.Context): Express => {
    const controller = context.container.get(SessionController);

    const app = express();
    app.use(bodyParser.json())

    app.post("/sessions", controller.initializeGameSession.bind(controller));
    app.get("/sessions/:gameSessionId", controller.retrieveGameSession.bind(controller));

    return app;
});

container.bind(TYPES.SessionRepository).to(InMemorySessionRepository);

export default container;
