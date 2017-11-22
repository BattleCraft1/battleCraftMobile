import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";

export default (entity,isEditMode) => {
    let validationErrors = {};
    let fieldErrors = {};

    if(entity.nameChange.length<1 || entity.nameChange.length>50)
        fieldErrors.nameChange = "Game name must have between 1 to 50 chars";

    if(entity.gameRules!==undefined)
        validateGameRules(entity.gameRules,fieldErrors);
    else if(!isEditMode)
        fieldErrors.gameRules = "Please choose pdf file with game rules";

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid game data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}

function validateGameRules(uri,fieldErrors){
    let fileType = uri.substr(uri.lastIndexOf(".") + 1);;

    if(fileType !== 'pdf'){
        fieldErrors.gameRules = "Extension: "+fileType+" is not acceptable extension of user avatar. You should try with pdf";
    }
}