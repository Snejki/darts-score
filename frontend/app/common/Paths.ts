export const Paths = {
    players: "/players",
    gameType: "/game/type",
    searchPlayers: (search: string) => `/players?query=${search}`,
    gameConfiguration: (gameType: string) => `/game/configuration/${gameType}`,
    game: (gameId: string) => `/game/play/${gameId}`
}