import { Cell, CellType } from './Cell';

export const Grid = Object.freeze({
    'SQUARE': 'square',
    'DIAMOND': 'diamond'
})

export class Game {
    /**
     * @param {typeof Grid[keyof typeof Grid]} grid - grid type
     * @param {Cell[][]} matrix - 2D array of cells 5 * 5
     * @param {number} screenWidth
     * @param {number} screenHeight
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     * @param ctx - canvas context
     */
    constructor(grid, matrix, screenWidth, screenHeight, canvasWidth, canvasHeight, ctx) {
        this.grid = grid;
        this.matrix = matrix;
        this.ctx = ctx
        this.lines = []
        matrix.forEach((row, iy) => row.forEach((cell, ix) => {
            if (cell.type === CellType.START) {
                this.lines.push([[ix, iy]])
            }
        }))
        this.lineIndex = -1

        this.screenWidth = screenWidth
        this.screenHeight = screenHeight
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight

        // get size constraints
        const constraints = this._getSizeConstraints(screenWidth, screenHeight, canvasWidth, canvasHeight)
        this.unit = constraints[0]
        this.xPadding = constraints[1]
        this.yPadding = constraints[2]
        this.yGridPadding = constraints[3]
        this._draw()
    }

    /**
     * Restarts the level of the game.
     */
    restart() {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i] = [this.lines[i][0]]
        }
        this.lineIndex = -1
        this._draw()
    }

    /**
     * @param {typeof Grid[keyof typeof Grid]} grid - grid type
     * @param {Cell[][]} matrix - 2D array of cells 5 * 5
     */
    changeLevel(grid, matrix) {
        this.grid = grid;
        this.matrix = matrix;

        const constraints =
            this._getSizeConstraints(this.screenWidth, this.screenHeight, this.canvasWidth, this.canvasHeight)
        this.unit = constraints[0]
        this.xPadding = constraints[1]
        this.yPadding = constraints[2]
        this.yGridPadding = constraints[3]

        this.lines = []
        matrix.forEach((row, iy) => row.forEach((cell, ix) => {
            if (cell.type === CellType.START) {
                this.lines.push([[ix, iy]])
            }
        }))
        this.lineIndex = -1
        this._draw()
    }

    /**
     * @param {number} x - x coordinates
     * @param {number} y - y coordinates
     *
     */
    backtrack(x, y) {
        const cs = this._coordinatesToCellIndex(x, y)

        if (cs !== undefined) {
            for (let i = 0; i < this.lines.length; i++) {
                const line = this.lines[i];

                for (let j = 0; j < line.length; j++) {
                    const cell = line[j];
                    if (cell[0] === cs[0] && cell[1] === cs[1]) {
                        this.lines[i] = line.slice(0, j + 1)
                        break;
                    }
                }
            }

            this._draw()
        }
    }

    /**
     * Checks if the level is completed
     * @returns {boolean}
     */
    finish() {
        /** @type {Object.<string, number>} */
        const cellCrossCounts = {}

        for (let index = 0; index < this.lines.length; index++) {
            const line = this.lines[index];

            for (let i = 0; i < line.length; i++) {
                const cell = line[i]
                cellCrossCounts[`${cell[0]},${cell[1]}`] = (cellCrossCounts[`${cell[0]},${cell[1]}`] ?? 0) + 1
            }
        }

        for (let iy = 0; iy < this.matrix.length; iy++) {
            const row = this.matrix[iy]
            for (let ix = 0; ix < row.length; ix++) {
                const cell = row[ix];
                const crossCount = cellCrossCounts[`${ix},${iy}`] ?? 0

                if ((cell.type === CellType.SIMPLE && crossCount !== 1) ||
                    (cell.type === CellType.COLOR && crossCount !== 1) ||
                    (cell.type === CellType.DOUBLE && crossCount !== 2)) {
                    console.info(`finish false | ${cell.type} | ${ix},${iy} | ${crossCount}`)
                    return false
                }
            }
        }

        return true
    }

    /**
     * Draws the level.
     */
    _draw() {
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)

        for (let iy = 0; iy < this.matrix.length; iy++) {
            const row = this.matrix[iy]
            for (let ix = 0; ix < row.length; ix++) {
                const cell = row[ix];
                switch (cell.type) {
                    case CellType.START:
                        this._drawStart(ix, iy, cell.color)
                        break;
                    case CellType.SIMPLE:
                        this._drawSimple(ix, iy)
                        break;
                    case CellType.DOUBLE:
                        this._drawDouble(ix, iy)
                        break;
                    case CellType.COLOR:
                        this._drawColor(ix, iy, cell.color)
                        break;
                    case CellType.WALL:
                        this._drawWall(ix, iy)
                        break;
                    case CellType.EMPTY:
                        break;
                    default:
                        break;
                }
            }
        }

        this._drawLines()
    }

    /**
     * Starts the line with the given coordinates
     * @param {number} x - x coordinates
     * @param {number} y - y coordinates
     */
    startLine(x, y) {
        const cs = this._coordinatesToCellIndex(x, y)
        if (cs !== undefined) {
            for (let i = 0; i < this.lines.length; i++) {
                const lastCell = this.lines[i][this.lines[i].length - 1];
                if (lastCell[0] === cs[0] && lastCell[1] === cs[1]) {
                    this.lineIndex = i
                }
            }
        }
    }

    /**
     * Updates the line with the given coordinates
     * @param {number} x - x coordinates
     * @param {number} y - y coordinates
     */
    updateLine(x, y) {
        if (this.lineIndex !== -1) {
            const toCellCoordinates = this._coordinatesToCellIndex(x, y)
            if (toCellCoordinates !== undefined) {
                const toCell = this.matrix[toCellCoordinates[1]][toCellCoordinates[0]]

                const fromCellCoordinates = this.lines[this.lineIndex][this.lines[this.lineIndex].length - 1];

                const lineColor = this.matrix[this.lines[this.lineIndex][0][1]][this.lines[this.lineIndex][0][0]].color

                if (this._lineValid(fromCellCoordinates, toCellCoordinates, toCell, lineColor)) {
                    this.lines[this.lineIndex].push(toCellCoordinates)
                    this._draw()
                }
            }
        }
    }

    /**
     * Ends the line
     */
    endLine() {
        this.lineIndex = -1
        this._draw()
    }

    /**
     * @param {number[]} fromCellCoordinates
     * @param {number[]} toCellCoordinates
     * @param {Cell} toCell
     * @param {string} lineColor
     * @returns {boolean}
     */
    _lineValid(fromCellCoordinates, toCellCoordinates, toCell, lineColor) {
        // check if going back
        if (this.lines[this.lineIndex].length > 1 &&
            this.lines[this.lineIndex][this.lines[this.lineIndex].length - 2][0] === toCellCoordinates[0] &&
            this.lines[this.lineIndex][this.lines[this.lineIndex].length - 2][1] === toCellCoordinates[1]) {
            return false
        }

        // check toCell type
        if (toCell.type === CellType.START ||
            toCell.type === CellType.WALL ||
            toCell.type === CellType.EMPTY ||
            (toCell.type === CellType.COLOR && lineColor !== toCell.color)) {
            return false
        }

        // check if cell is full
        let crossNumber = 0
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];

            for (let j = 0; j < line.length; j++) {
                const cs = line[j];

                if (cs[0] === toCellCoordinates[0] && cs[1] === toCellCoordinates[1]) {
                    crossNumber++
                }
            }
        }
        if (toCell.type === CellType.DOUBLE) {
            if (crossNumber === 2) {
                return false
            }
        } else if (crossNumber === 1) {
            return false
        }

        if (this.grid === 'square') {
            // check if cells are neighbours
            if (Math.abs(toCellCoordinates[0] - fromCellCoordinates[0]) +
            Math.abs(toCellCoordinates[1] - fromCellCoordinates[1]) !== 1) {
                return false
            }
        } else {
            // same cell
            if (fromCellCoordinates[0] === toCellCoordinates[0] && fromCellCoordinates[1] === toCellCoordinates[1]) {
                return false
            }

            // too long
            if (Math.abs(fromCellCoordinates[0] - toCellCoordinates[0]) > 1 ||
                Math.abs(fromCellCoordinates[1] - toCellCoordinates[1]) > 1) {
                return false
            }

            // horizontal
            if (Math.abs(fromCellCoordinates[0] - toCellCoordinates[0]) === 1) {
                let leftX, yDif;
                if (fromCellCoordinates[0] < toCellCoordinates[0]) {
                    leftX = fromCellCoordinates[0]
                    yDif = toCellCoordinates[1] - fromCellCoordinates[1]
                } else {
                    leftX = toCellCoordinates[0]
                    yDif = fromCellCoordinates[1] - toCellCoordinates[1]
                }

                if (leftX % 2 === 0 && yDif !== -1 && yDif !== 0) {
                    return false
                }

                if (leftX % 2 === 1 && yDif !== 0 && yDif !== 1) {
                    return false
                }
            }
        }

        return true
    }

    /**
     * Draws the lines in the canvas using its context
     */
    _drawLines() {
        /** @type {Object.<string, string[]>} */
        const cellColors = {}

        for (let index = 0; index < this.lines.length; index++) {
            const line = this.lines[index];

            if (line.length < 2) {
                continue
            }

            this.ctx.strokeStyle = this.matrix[line[0][1]][line[0][0]].color

            for (let i = 0; i < line.length - 1; i++) {
                const pre = line[i]
                const preCoordinates = this._getCoordinates(pre[0], pre[1])

                const next = line[i+1]
                const nextCoordinates = this._getCoordinates(next[0], next[1])

                this.ctx.lineWidth = this.unit * 0.175
                this.ctx.beginPath();
                this.ctx.moveTo(preCoordinates[0], preCoordinates[1]);
                this.ctx.lineTo(nextCoordinates[0], nextCoordinates[1]);
                this.ctx.stroke();

                const colorArr = cellColors[`${JSON.stringify(next)}`] ?? []
                colorArr.push(this.ctx.strokeStyle)
                cellColors[`${JSON.stringify(next)}`] = colorArr
            }
        }

        for (let index = 0; index < Object.keys(cellColors).length; index++) {
            const key = Object.keys(cellColors)[index]
            const indexes = JSON.parse(key)
            const colors = cellColors[key]
            const coordinates = this._getCoordinates(indexes[0], indexes[1])
            const cellType = this.matrix[indexes[1]][indexes[0]].type

            if (cellType === CellType.DOUBLE) {
                if (colors.length === 2) {
                    this.ctx.lineWidth = this.unit * 0.35
                    this.ctx.strokeStyle = colors[0]

                    let r = (this.unit * 0.35) / 2
                    this.ctx.beginPath();
                    this.ctx.arc(coordinates[0], coordinates[1], r, 0, 6.28);
                    this.ctx.stroke();

                    this.ctx.lineWidth = (this.unit * 0.35) / 2;
                    this.ctx.strokeStyle = colors[1]

                    r = (this.unit * 0.35) / 4
                    this.ctx.beginPath();
                    this.ctx.arc(coordinates[0], coordinates[1], r, 0, 6.28);
                    this.ctx.stroke();
                } else {
                    this.ctx.lineWidth = (this.unit * 0.35) / 2;
                    this.ctx.strokeStyle = colors[0]

                    const r = (this.unit * 0.35) / 4
                    this.ctx.beginPath();
                    this.ctx.arc(coordinates[0], coordinates[1], r, 0, 6.28);
                    this.ctx.stroke();
                }
            } else {
                this.ctx.lineWidth = this.unit * 0.35
                this.ctx.strokeStyle = colors[0]

                const r = (this.unit * 0.35) / 2
                this.ctx.beginPath();
                this.ctx.arc(coordinates[0], coordinates[1], r, 0, 6.28);
                this.ctx.stroke();
            }
        }
    }

    /**
     * @param {number} x - x coordinates
     * @param {number} y - y coordinates
     * @returns {number[] | undefined} - cell index in matrix [ix, iy] or undefined
     */
    _coordinatesToCellIndex(x, y) {
        const gridX = Math.floor((x - this.xPadding) / this.unit)
        let yMargin = this.yPadding

        if (this.grid === Grid.SQUARE) {
            yMargin += this.yGridPadding
        } else if (gridX % 2 === 1) {
            yMargin += this.yGridPadding
        }
        const gridY = Math.floor((y - yMargin) / this.unit)
        return [gridX, gridY]
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} color
     */
    _drawStart(x, y, color) {
        this.ctx.lineWidth = this.unit * 0.35
        this.ctx.strokeStyle = color

        const cs = this._getCoordinates(x, y)
        const r = (this.unit * 0.35) / 2
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    _drawSimple(x, y) {
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = '#ffffffff';

        const cs = this._getCoordinates(x, y)
        const r = this.unit * 0.35 - 1.5
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    _drawDouble(x, y) {
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = '#ffffffff';

        const cs = this._getCoordinates(x, y)
        let r = (this.unit * 0.35) / 2 - 1.5
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();

        r = this.unit * 0.35 - 1.5
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} color
     */
    _drawColor(x, y, color) {
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = color;

        const cs = this._getCoordinates(x, y)
        const r = this.unit * 0.35 - 1.5
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    _drawWall(x, y) {
        this.ctx.lineWidth = (this.unit * 0.35) / 2;
        this.ctx.strokeStyle = '#ff7a7a7a';

        const cs = this._getCoordinates(x, y)
        const r = (this.unit * 0.35) / 4
        this.ctx.beginPath();
        this.ctx.arc(cs[0], cs[1], r, 0, 6.28);
        this.ctx.stroke();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    _getCoordinates(x, y) {
        const cx = this.xPadding + (x * this.unit) + (this.unit / 2)
        let cy = this.yPadding + (y * this.unit) + (this.unit / 2)

        if (this.grid === Grid.SQUARE) {
            cy += this.yGridPadding
        } else if (x % 2 === 1) {
            cy += this.yGridPadding
        }

        return [cx, cy]
    }

    /**
     * @param {number} screenWidth
     * @param {number} screenHeight
     * @param {number} width
     * @param {number} height
     */
    _getSizeConstraints(screenWidth, screenHeight, width, height) {
        let unit = 0
        let xPadding = (screenWidth - width) / 2
        let yPadding = (screenHeight - height) / 2
        let yGridPadding = 0

        if (height > width) {
            unit = width / 5.5
            yPadding += (height - width) / 2
            const xGridPadding = (width - (unit * 5)) / 2
            yGridPadding = this.grid === Grid.SQUARE ? xGridPadding : xGridPadding * 2
            xPadding += xGridPadding
        } else {
            unit = height / 5.5
            const xGridPadding = (height - (unit * 5)) / 2
            yGridPadding = this.grid === Grid.SQUARE ? xGridPadding : xGridPadding * 2
            xPadding += ((width - height) / 2) + xGridPadding
        }

        return [unit, xPadding, yPadding, yGridPadding]
    }
}