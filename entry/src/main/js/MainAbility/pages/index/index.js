import { Cell } from '../../common/js/Cell';
import { Game } from '../../common/js/Game';
import { readValue, writeValue } from '../../common/js/keyStorage';
import { allLevels } from '../../common/js/Levels'
import { getDeviceInfo } from '../../common/js/DeviceUtils';
import { readFileText } from '../../common/js/FileUtils';
import { vibrateDevice } from '../../common/js/VibratorUtils';

export default {
    data: {
        levelIndex: 0,
        achievedLevel: 0,
        maxLevel: 14,
        game: undefined,
        screenShape: 'circle',
        screenWidth: 0,
        screenHeight: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        showButtons: false,
        vibrate: false,
        useRawFile: false
    },

    onInit() {
        const _level = readValue('achievedLevel');
        this.achievedLevel = Number.parseInt(_level !== '' ? _level : '1')
        this.levelIndex = this.achievedLevel
        this.vibrate = readValue('vibrate') === 'on'
    },

    onReady() {
        this._setConstraints()
    },

    parseLevelJSON(json) {
        const matrix = json.matrix.map(row => row.map(cell => new Cell(cell.type, cell.color)));
        return [json.grid, matrix]
    },

    _initializeNewLevel() {
        const levelJson = this._readLevelJson()

        if (this.game === undefined) {
            const el = this.$refs.canvas;
            const ctx = el.getContext('2d');
            const levelInfo = this.parseLevelJSON(levelJson);
            this.game = new Game(levelInfo[0], levelInfo[1], this.screenWidth, this.screenHeight, this.canvasWidth,
                this.canvasHeight, ctx)
        } else {
            const levelInfo = this.parseLevelJSON(levelJson);
            this.game.changeLevel(levelInfo[0], levelInfo[1])
        }

        if (this.vibrate) {
            vibrateDevice();
        }
    },

    _readLevelJson() {
        if (this.useRawFile) {
            const uri = `internal://app/rawfile/${this.levelIndex}.json`
            return readFileText(uri);
        } else {
            return allLevels[this.levelIndex - 1];
        }
    },

    _setConstraints() {
        getDeviceInfo((data) => {
            this.screenShape = data.screenShape;
            const multiplier = this.screenShape === 'rect' ? 1 : 0.8;

            this.screenWidth = data.windowWidth;
            this.screenHeight = data.windowHeight;

            this.canvasWidth = this.screenWidth * multiplier;
            this.canvasHeight = this.screenHeight * 0.9 * multiplier;

            this._initializeNewLevel();
        }, (data, code) => {
            console.error(`Failed to obtain device information. code: ${code} | ${data}`);
        });
    },

    touchStart(e) {
        if (!this.showButtons) {
            this.game.startLine(e.globalX, e.globalY);
        }
    },

    touchMove(e) {
        if (!this.showButtons) {
            this.game.updateLine(e.globalX, e.globalY)
        }
    },

    touchEnd(e) {
        if (!this.showButtons) {
            this.game.endLine()

            if (this.game.finish()) {
                this.achievedLevel++
                writeValue('achievedLevel', `${this.achievedLevel}`)
                this.goNext()
            }
        }
    },

    backtrack(e) {
        if (!this.showButtons) {
            this.game.backtrack(e.globalX, e.globalY)
        }
    },

    toggleButtons(show) {
        this.showButtons = show
    },

    restartLevel() {
        this.game.restart()
        this.showButtons = false
    },

    goNext() {
        if (this.levelIndex < this.maxLevel && this.levelIndex < this.achievedLevel) {
            this.levelIndex++
            this._initializeNewLevel()
            this.showButtons = false
        }
    },

    goPrevious() {
        if (this.levelIndex > 1) {
            this.levelIndex--
            this._initializeNewLevel()
            this.showButtons = false
        }
    },

    toggleVibrate() {
        if (this.vibrate) {
            writeValue('vibrate', 'off')
        } else {
            writeValue('vibrate', 'on')
            vibrateDevice();
        }

        this.vibrate = !this.vibrate
    }
};
