import Vibrator from '@system.vibrator'

/**
 * Short type of vibration for device using system vibrator functionality
 */
export function vibrateDevice() {
    Vibrator.vibrate({ mode: 'short' });
}