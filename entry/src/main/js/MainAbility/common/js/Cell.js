export const CellType = Object.freeze({
    'START': 'start',
    'SIMPLE': 'simple',
    'DOUBLE': 'double',
    'COLOR': 'color',
    'WALL': 'wall',
    'EMPTY': 'empty'
})

export class Cell {
    /**
     * @param {typeof CellType[keyof typeof CellType]} type - cell type
     * @param {string} [color=undefined] - cell color in hex format
     **/
    constructor(type, color = undefined) {
        this.type = type;
        this.color = color;
    }
}