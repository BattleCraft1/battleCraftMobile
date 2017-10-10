import compareArrays from './compareArrays'

export default (searchCriteria) => {
    let gameName = "";
    if(searchCriteria.length>0){
        let gameCriteria = searchCriteria.find(criteria => compareArrays(criteria["keys"],["tour", "tournament", "game","name"]));
        gameName = gameCriteria["value"];
    }
    return gameName;
}