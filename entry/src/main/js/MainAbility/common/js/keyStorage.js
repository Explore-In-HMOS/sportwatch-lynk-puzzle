import storage from '@system.storage';

export function readValue(key) {
    let res = '';

    storage.get({
        key: key,
        success: function (data) {
            console.info(`call storage.get success: ${data}`)
            res = data
        },
        fail: function (data, code) {
            console.info(`call storage.get fail, key: ${key}, code: ${code}, data: ${data}`);
        },
        complete: function () {
            console.info('call complete');
        }
    });

    return res
}

export function writeValue(key, value) {
    storage.set({
        key: key,
        value: value,
        success: function () {
            console.info('call storage.set success.');
        },
        fail: function (data, code) {
            console.info(`call storage.set fail, key: ${key}, code: ${code}, data: ${data}`);
        }
    });
}

export function deleteValue(key) {
    storage.delete({
        key: key,
        success: function () {
            console.info('call storage.delete success.');
        },
        fail: function (data, code) {
            console.info(`call storage.delete fail, key: ${key}, code: ${code}, data: ${data}`);
        }
    });
}


