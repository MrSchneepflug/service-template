import {GameSessionService} from "../../../../src/application/services/GameSessionService";

test("will initialize a new session and persists it", async () => {
    const repositoryMock = {
        save: jest.fn(() => Promise.resolve()),
        load: jest.fn()
    };

    const service = new GameSessionService(repositoryMock);
    const gameSession = await service.initializeGameSession();

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(gameSession).toMatchObject({
        done: false,
        cards: [],
    })
});
