import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";
import validateAddress from './AddressValidator'
import getDatesDifferenceInDays from "../../../main/functions/getDatesDifferenceInDays";
import dateFormat from 'dateformat';
import {factorial} from "../../../main/functions/factorial"

export default (entity) => {
    let validationErrors = {};
    let fieldErrors = {};
    if(!entity.nameChange.match(new RegExp("^[A-Za-zzżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 ]{2,30}$")))
        fieldErrors.nameChange = "Tournament name must start with big letter and have between 2 to 30 chars";

    if(entity.playersOnTableCount!==2 && entity.playersOnTableCount!==4)
        fieldErrors.playersOnTableCount = "You can choose only 2 or 4 players count on table";

    if(entity.playersOnTableCount===2){
        if(entity.tablesCount<1 || entity.tablesCount>30)
            fieldErrors.tablesCount = "Tables count must be between 1 and 30";
    }
    else if(entity.playersOnTableCount===4){
        if(entity.tablesCount<1 || entity.tablesCount>15)
            fieldErrors.tablesCount = "Tables count must be between 1 and 15";
    }

    let maxToursNumber = (entity.tablesCount*2);
    if(entity.toursCount>maxToursNumber)
        fieldErrors.toursCount = "Max tours number in this tournament is: "+maxToursNumber;

    if(entity.dateOfStart===undefined || getDatesDifferenceInDays(new Date(),new Date(entity.dateOfStart))<0)
        fieldErrors.dateOfStart = "You cannot start tournament at "+dateFormat(entity.dateOfStart,"yyyy-mm-dd HH:MM")+" because this date is outdated";

    if(entity.dateOfEnd===undefined || getDatesDifferenceInDays(new Date(entity.dateOfStart),new Date(entity.dateOfEnd))<0)
        fieldErrors.dateOfEnd = "End date must be later than "+dateFormat(entity.dateOfStart,"yyyy-mm-dd HH:MM");

    if(getDatesDifferenceInDays(new Date(entity.dateOfStart),new Date(entity.dateOfEnd))>3)
        fieldErrors.dateOfEnd = "Duration of tournament cannnot be longer than 3 days";

    validateAddress(entity,fieldErrors);

    if(entity.organizers.length>10)
        fieldErrors.organizers = "Count of organizers must be less than 10";

    if((new Set(entity.organizers)).size !== entity.organizers.length)
        fieldErrors.organizers = "You can invite organizer only once";

    let participantsFlatTable = [];

    entity.participants.map(participantGroup => {
        let participantGroupToValidate = [];
        participantGroup.forEach(participant => participantGroupToValidate.push(participant.name));
        participantsFlatTable.push(participantGroupToValidate);
    });

    if((new Set(participantsFlatTable)).size !== participantsFlatTable.length)
        fieldErrors.organizers = "You can invite player only once";

    if(entity.tablesCount*entity.playersOnTableCount!==0 &&
        participantsFlatTable.length*entity.playersOnTableCount/2>entity.tablesCount*entity.playersOnTableCount)
        fieldErrors.participants = "Participants count must be less than "+entity.tablesCount*entity.playersOnTableCount;

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid tournament data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}