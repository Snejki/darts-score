export const Paths = {
    gameConfiguration: (gameType: string) => `/game/${gameType}`,
    game: (gameType: string, gameId: string) => `/game/${gameType}/play/${gameId}`
}

export const BackendPaths = {
    searchPlayers: (search: string) => `/players?query=${search}`,
    createGame:  (type: string) => `/game/${type}`
}