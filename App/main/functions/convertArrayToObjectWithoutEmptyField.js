export default function arrayToObject(arr) {
    if (arr===undefined) return {};
    let rv = {};
    for (let i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[arr[i]] = arr[i];
    return rv;
}