const level1JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "wall" }, { "type": "start", "color": "#FF0000" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level2JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "start", "color": "#00FF00" }, { "type": "simple" }, { "type": "simple" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "wall" }, { "type": "wall" }, { "type": "wall" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" },
            { "type": "empty" }]
    ]
}

const level3JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" }, { "type": "simple" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level4JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "start", "color": "#FF0000" }, { "type": "wall" }, { "type": "wall" }, { "type": "wall" },
            { "type": "start", "color": "#00FF00" },],
        [{ "type": "simple" }, { "type": "wall" }, { "type": "simple" }, { "type": "wall" }, { "type": "simple" }],
        [{ "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }],
        [{ "type": "wall" }, { "type": "simple" }, { "type": "wall" }, { "type": "simple" }, { "type": "wall" }],
        [{ "type": "wall" }, { "type": "wall" }, { "type": "simple" }, { "type": "wall" }, { "type": "wall" }]
    ]
}

const level5JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "double" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "start", "color": "#FF0000" }, { "type": "simple" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level6JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "wall" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "wall" }, { "type": "double" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "wall" }, { "type": "start", "color": "#FF0000" }, { "type": "wall" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level7JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "double" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "start", "color": "#FF0000" }, { "type": "simple" },
            { "type": "start", "color": "#00FF00" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level8JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "wall" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "start", "color": "#00FF00" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "double" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "start", "color": "#FF0000" }, { "type": "wall" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level9JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "start", "color": "#00FF00" }, { "type": "simple" }, { "type": "simple" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "color", "color": "#FF0000" }, { "type": "color", "color": "#FF0000" },
            { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#00FF00" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level10JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "start", "color": "#FF0000" }, { "type": "simple" }, { "type": "simple" },
            { "type": "start", "color": "#00FF00" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#FF0000" }, { "type": "simple" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#FF0000" }, { "type": "simple" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" },
            { "type": "simple" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level11JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "empty" }, { "type": "empty" }, { "type": "color", "color": "#FF0000" },
            { "type": "start", "color": "#00FF00" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "color", "color": "#FF0000" },
            { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "simple" }, { "type": "color", "color": "#00FF00" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "start", "color": "#FF0000" },
            { "type": "color", "color": "#00FF00" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }, { "type": "empty" }]
    ]
}

const level12JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "wall" }, { "type": "color", "color": "#00FF00" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#00FF00" }, { "type": "wall" }],
        [{ "type": "simple" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" }, { "type": "simple" },
            { "type": "simple" },],
        [{ "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }, { "type": "simple" }],
        [{ "type": "simple" }, { "type": "color", "color": "#FF0000" }, { "type": "start", "color": "#00FF00" },
            { "type": "color", "color": "#FF0000" }, { "type": "simple" }],
        [{ "type": "wall" }, { "type": "wall" }, { "type": "color", "color": "#FF0000" }, { "type": "wall" },
            { "type": "wall" }]
    ]
}

const level13JSON = {
    "grid": "square",
    "matrix": [
        [{ "type": "empty" }, { "type": "simple" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" },
            { "type": "empty" }],
        [{ "type": "empty" }, { "type": "double" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#00FF00" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "wall" },
            { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "color", "color": "#FF0000" }, { "type": "color", "color": "#FF0000" },
            { "type": "double" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "start", "color": "#00FF00" }, { "type": "simple" }, { "type": "simple" },
            { "type": "empty" }]
    ]
}

const level14JSON = {
    "grid": "diamond",
    "matrix": [
        [{ "type": "empty" }, { "type": "color", "color": "#00FF00" }, { "type": "color", "color": "#00FF00" },
            { "type": "color", "color": "#00FF00" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "start", "color": "#FF0000" },
            { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "simple" }, { "type": "double" }, { "type": "simple" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "color", "color": "#FF0000" }, { "type": "start", "color": "#00FF00" },
            { "type": "color", "color": "#FF0000" }, { "type": "empty" }],
        [{ "type": "empty" }, { "type": "wall" }, { "type": "color", "color": "#FF0000" }, { "type": "wall" },
            { "type": "empty" }]
    ]
}

export const allLevels = [
    level1JSON, // simple square
    level2JSON, // two color simple square
    level3JSON, // simple diamond
    level4JSON, // two color simple diamond
    level5JSON, // double square
    level6JSON, // double diamond
    level7JSON, // two color double square
    level8JSON, // two color double diamond
    level9JSON, // two color pre-color square
    level10JSON, // two color pre-color square
    level11JSON, // two color pre-color diamond
    level12JSON, // two color pre-color diamond
    level13JSON, // two color pre-color double square
    level14JSON// two color pre-color double diamond
]