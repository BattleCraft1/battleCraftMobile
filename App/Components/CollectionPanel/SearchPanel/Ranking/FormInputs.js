import React, { Component } from 'react';
import {
    View
} from 'react-native';

import TextInput from './../Inputs/TextInput'
import SelectInput from './../Inputs/SelectInput'
import NumberInput from './../Inputs/NumberInput'
import DateInput from './../Inputs/DateInput'

import convertArrayToObject from '../../../../Main/functions/convertArrayToObject'

export default class FormInputs extends Component{
    constructor(props) {
        super(props);
        this.tournamentStatus = {
            provincesNames:{},
            tournamentsGames:{},
            searchFormField: {
                "name":{},
                "province":{},
                "city":{},
                "numberOfBattles":{},
                "numberOfTournaments":{},
                "points":{}
            }
        };
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:nextProps.enums.provincesNames});
            this.setState({tournamentsGames:nextProps.enums.gamesNames});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:convertArrayToObject(this.props.enums.provincesNames)});
        this.setState({tournamentsGames:convertArrayToObject(this.props.enums.gamesNames)});
        let status = this.props.enums.tournamentsStatus;
        status.push("BANNED");
        this.setState({status: convertArrayToObject(status)});
    }

    changeSearchForm(index,value){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
    }

    render(){
        return(
            <View>
                <TextInput
                    name = "Name"
                    placeholder = "Jarek123"
                    keys = {["player","name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "City"
                    placeholder = "Lublin"
                    keys = {["tour","tournament","address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Province"
                    keys = {["tour","tournament","address", "province","location"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {this.state.provincesNames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Game"
                    keys = {["tour","tournament","game","name"]}
                    operation = ":"
                    indexOfSearchFields = "game"
                    options = {this.state.tournamentsGames}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Points"
                    keys = {["players","points"]}
                    operation = "<"
                    indexOfSearchFields = "points"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Date from"
                    keys = {["tour","tournament","dateOfStart"]}
                    operation = ">"
                    indexOfSearchFields = "dateOfStart"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
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