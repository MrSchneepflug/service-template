import http from "http";
import {AddressInfo} from "net";
import axios from "axios";
import container from "../../src/inversify.config";
import {TYPES} from "../../src/inversify.types";
import {Express} from "express";
import {ApiActor} from "./actors/ApiActor";
import {PersistenceActor} from "./actors/PersistenceActor";
import {Connection, createConnection} from "typeorm";

let server: http.Server;
let connection: Connection;

export async function setup() {
    axios.defaults.validateStatus = status => status >= 200 && status <= 599;

    connection = await createConnection();
    container.bind(Connection).toConstantValue(connection);

    const app = container.get<Express>(TYPES.App);
    server = app.listen(0);
    const servicePort = (server.address() as AddressInfo).port;

    const apiActor = new ApiActor(servicePort);
    const persistenceActor = new PersistenceActor(
        container.get(TYPES.GameSessionRepository),
        connection
    );

    return {
        apiActor,
        persistenceActor,
    }
}

export async function teardown() {
    server.close();
    await connection.close();
}
