import http from "http";
import {AddressInfo} from "net";
import axios from "axios";
import container from "../../src/inversify.config";
import {TYPES} from "../../src/inversify.types";
import {Express} from "express";
import {ApiActor} from "../service-tests/actors/ApiActor";
import {PersistenceActor} from "../service-tests/actors/PersistenceActor";

let server: http.Server;

export function setup() {
    axios.defaults.validateStatus = status => status >= 200 && status <= 599;

    const app = container.get<Express>(TYPES.App);
    server = app.listen(0);
    const servicePort = (server.address() as AddressInfo).port;

    const apiActor = new ApiActor(servicePort);
    const persistenceActor = new PersistenceActor(container.get(TYPES.SessionRepository));

    return {
        apiActor,
        persistenceActor,
    }
}

export function teardown() {
    server.close();
}
