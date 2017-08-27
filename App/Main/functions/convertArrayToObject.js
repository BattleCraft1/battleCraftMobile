export default function arrayToObject(arr) {
    arr.unshift('');
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[arr[i]] = arr[i];
    return rv;
}
