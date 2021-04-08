module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.js$': 'babel-jest',
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ['js', 'svelte', "ts"],

}