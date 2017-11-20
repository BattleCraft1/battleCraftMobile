import React from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import UserInGroupRow from './ParticipantInGroupRow'
import EmptyUserInGroupRow from './EmptyUserInGroupRow'

import EntityPanelStyle from '../../../../../../Styles/CollectionPanelStyles/EntityPanelStyle'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../../../redux/actions/index';

class ParticipantsGroupTableRow extends React.Component{

    startInviteParticipantsToGroup(){
        this.props.setOperations(["Invite"]);
        let invitedParticipantsNames = [];
        let invitedInThisGroup = [];

        for (let i = 0; i < this.props.group.length; i++) {
            if(this.props.group[i].name!==undefined)
                invitedInThisGroup.push(this.props.group[i].name);
        }

        for (let i = 0; i < this.props.invited.length; i++) {
            for (let j = 0; j < this.props.invited[i].length; j++) {
                if(this.props.invited[i][j].name!==undefined &&
                    invitedInThisGroup.indexOf(this.props.invited[i][j].name) === -1)
                    invitedParticipantsNames.push(this.props.invited[i][j].name);
            }
        }

        let searchCriteria = [];
        searchCriteria.push({
            "keys": ["status"],
            "operation": ":",
            "value": ["ORGANIZER","ACCEPTED"]
        });

        searchCriteria.push({
            "keys": ["banned"],
            "operation": ":",
            "value": [false]
        });

        if(invitedParticipantsNames.length>0)
            searchCriteria.push({
                "keys": ["name"],
                "operation": "not in",
                "value": invitedParticipantsNames
            });

        this.props.setRelatedEntity(
            invitedInThisGroup,
            "participantsGroup"+this.props.index,
            searchCriteria,
            2);

        this.props.navigate('Users')
    }

    createRows(){
        let rows = [];
        if(this.props.group.length === 1){
            rows.push(this.createRow(this.props.group[0],0));
            rows.push(<EmptyUserInGroupRow disabled={this.props.disabled} key="empty"/>);
        }
        else{
            rows.push(this.createRow(this.props.group[0],0));
            rows.push(this.createRow(this.props.group[1],1));
        }
        return rows;
    }

    createRow(user,index){
        if(user.name !== undefined){
            return <UserInGroupRow
                index={this.props.index}
                disabled={this.props.disabled}
                key={user.name}
                name = {user.name}
                accepted = {user.accepted}
                deleteElement = {this.props.deleteElement}
            />
        }
        else{
            return <EmptyUserInGroupRow disabled={this.props.disabled} key={index}/>
        }
    }

    render(){
        return(
            <View style={{marginTop: 5}}>
                <View>
                    {this.createRows()}
                </View>
                {!this.props.disabled &&
                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight style={[EntityPanelStyle.participantsGroupButton]}
                                        onPress={() => {this.props.deleteGroup(this.props.index)}}>
                        <Text style={EntityPanelStyle.buttonText}>Delete group</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[EntityPanelStyle.participantsGroupButton]}
                                        onPress={() => {this.startInviteParticipantsToGroup()}}>
                        <Text style={EntityPanelStyle.buttonText}>Invite group</Text>
                    </TouchableHighlight>
                </View>}
            </View>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( ParticipantsGroupTableRow );
