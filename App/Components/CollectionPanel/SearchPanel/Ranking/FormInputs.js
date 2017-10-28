import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

import TextInput from './../Inputs/TextInput'
import SelectInput from './../Inputs/SelectInput'
import NumberInput from './../Inputs/NumberInput'
import DateInput from './../Inputs/DateInput'
import GameInputForRanking from './../Inputs/GameInputForRanking'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../Redux/actions';

import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'
import convertArrayToObjectWithoutEmptyField from '../../../../Main/functions/convertArrayToObjectWithoutEmptyField'
import findGameName from '../../../../Main/functions/findGameName'

class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameName:findGameName(this.props.pageRequest.searchCriteria),
            provincesNames:{},
            tournamentsGames:{},
            searchFormField: {
                "name":{},
                "province":{},
                "city":{},
                "game":{},
                "points":{},
                "dateOfStart":{},
                "dateOfEnd":{},
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:convertArrayToObject(nextProps.enums["provincesNames"])});
            this.setState({tournamentsGames:convertArrayToObjectWithoutEmptyField(nextProps.enums["gamesNames"])});
            this.setDefaultGameSearchCriteria();
        }
    }

    componentDidMount(){
        this.setState({provincesNames:convertArrayToObject(this.props.enums["provincesNames"])});
        this.setState({tournamentsGames:convertArrayToObjectWithoutEmptyField(this.props.enums["gamesNames"])});
        this.setDefaultGameSearchCriteria();
    }

    setDefaultGameSearchCriteria(){
        this.changeSearchForm(
            "game",
            {
                "keys":["tour","tournament","game","name"],
                "operation":":",
                "value":this.state.gameName
            }
        );
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        return(
            <View>
                <TextInput
                    key="name"
                    name = "Name"
                    placeholder = "Jarek123"
                    keys = {["player","name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    key="city"
                    name = "City"
                    placeholder = "Lublin"
                    keys = {["tour","tournament","address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    key="province"
                    name = "Province"
                    keys = {["tour","tournament","address", "province"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {this.state.provincesNames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <GameInputForRanking
                    key="game"
                    name = "Game"
                    value = {this.state.gameName}
                    keys = {["tour","tournament","game","name"]}
                    operation = ":"
                    indexOfSearchFields = "game"
                    options = {this.state.tournamentsGames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    key="points"
                    name = "Points"
                    keys = {["players","points"]}
                    operation = "<"
                    indexOfSearchFields = "points"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="dateFrom"
                    name = "Date from"
                    keys = {["tour","tournament","dateOfStart"]}
                    operation = ">"
                    indexOfSearchFields = "dateOfStart"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    key="dateTo"
                    name = "Date to"
                    keys = {["tour","tournament","dateOfEnd"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfEnd"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <Button title="Search"  color='#4b371b' onPress={()=>this.props.search(this.state.searchFormField)}/>
            </View>);
    }
}



function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormInputs );