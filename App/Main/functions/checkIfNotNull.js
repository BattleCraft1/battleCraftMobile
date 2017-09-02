export default function checkIfNotNull(value,nullValue) {
    if(value === undefined)
        return nullValue;
    else return value;
}