export default (date1,date2) => {
    let timeDiff = date2.getTime() - date1.getTime();
    return timeDiff / (1000 * 3600 * 24);
}