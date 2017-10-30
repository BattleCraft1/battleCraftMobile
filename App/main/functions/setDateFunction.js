import dateFormat from 'dateformat';

export default function setDate(date) {
    if(date!==undefined)
        return dateFormat((new Date(date)),"dd-MM-yyyy HH:MM");
    else
        return "no date";
}