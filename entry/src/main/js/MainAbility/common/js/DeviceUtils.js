import device from '@system.device';

/**
 * Gets the device information, e.g: screenShape, windowWidth,windowHeight.
 * @param {function} success callback
 * @param {function} fail callback
 */
export function getDeviceInfo(success, fail) {
    device.getInfo({
        success: (data) => {
            success(data);
        },
        fail: function (data, code) {
            fail(data, code);
        }
    })
}
