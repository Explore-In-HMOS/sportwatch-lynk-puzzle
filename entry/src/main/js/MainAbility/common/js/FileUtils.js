import file from '@system.file';

/**
 * Reads a json file, and returns the json object
 * @param {string} uri - uri string.
 * @returns {object} - json object
 */
export function readFileText(uri) {
    let json = {};
    file.readText({
        uri: uri,
        success: (res) => {
            json = JSON.parse(res.text)
        },
        fail: (data, err) => {
            console.error(`Read file error, data: ${data}, error: ${err}`);
        }
    });
    return json;
}