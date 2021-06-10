import "reflect-metadata";
import {Express} from "express";
import container from "./inversify.config";
import {TYPES} from "./inversify.types";
import {createConnection} from "typeorm";
import {Connection} from "typeorm";

async function main() {
    let connection: Connection;

    try {
        connection = await createConnection();
    } catch (error) {
        console.error(`could not connect to database: ${error.message}`);
        process.exit(1);
    }

    container.bind(Connection).toConstantValue(connection);

    const app = container.get<Express>(TYPES.App);
    app.listen(3000, () => console.log("service listening on port 3000"));
}

main();
