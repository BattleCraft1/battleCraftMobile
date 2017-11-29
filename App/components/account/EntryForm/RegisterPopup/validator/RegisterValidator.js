import checkIfObjectIsNotEmpty from "../../../../../main/functions/checkIfObjectIsNotEmpty";
import validateAddress from '../../../../entityPanel/validators/AddressValidator'

export default (entity) => {
    let validationErrors = {};
    let fieldErrors = {};

    console.log("username:");
    console.log(entity.nameChange);
    if(!entity.nameChange.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻa-zzżźćńółęąś0-9]{3,30}$")))
        fieldErrors.nameChange = "Name must start with big letter and have between 3 to 30 chars";

    if(!entity.firstname.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻ][a-zzżźćńółęąś]{2,19}$")))
        fieldErrors.firstname = "First name must start with big letter and have between 3 to 30 chars";

    if(!entity.lastname.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻ][a-zzżźćńółęąś]{2,19}$")))
        fieldErrors.lastname = "Last name must start with big letter and have between 3 to 30 chars";

    if(entity.password.length<8 || entity.password.length>32)
        fieldErrors.password = "Password should have more than 8 characters and less than 32";

    if(entity.passwordConfirm!==entity.password)
        fieldErrors.passwordConfirm = "Password confirmation and password are not the same";

    if(entity.phoneNumber!=="" && !entity.phoneNumber.match(new RegExp("^[0-9]{9,11}$")))
        fieldErrors.phoneNumber = "Invalid phone number";

    if(!entity.email.match(new RegExp("(^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.+[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@+(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)")))
        fieldErrors.email = "Invalid email";

    validateAddress(entity,fieldErrors);

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid user data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}