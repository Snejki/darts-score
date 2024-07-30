export const Paths = {
    gameConfiguration: (gameType: string) => `/game/${gameType}`
}

export const BackendPaths = {
    searchPlayers: (search: string) => `/players?query=${search}`
}