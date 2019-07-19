import React from 'react';
import { headerItems } from './Constants';
import { connect } from 'react-redux';
import { UpdateRegisteredEvents,FetchEvents,FetchBMIData} from '../actions';

class Events extends React.Component{
    componentDidMount(){
        this.setActiveItem();
        this.props.FetchEvents();
    }

    setActiveItem = () => {
        var path = this.props.history.location.pathname;
        headerItems.map(function(val,ind) {
          val.active = false;
          if(val.link === path) {
            val.active = true;
          }
        })
    }

    registerEvent = (eventId,userRegistered) => {
        const userId = this.props.loggedInUserId;
        const updatedUsers = (userRegistered == '') ? (userRegistered + userId) : (userRegistered + ',' + userId);
        this.props.UpdateRegisteredEvents(updatedUsers,eventId);
    }

    render(){
        return (
            <div className="row">
               { this.props.allEvents != null && this.props.isSignedIn &&
                    <div className="col-md-12 no-padding">
                        {this.props.allEvents.map((event,index)=>{
                            return (
                                <div className="col-md-4" key={index}>
                                    <label>{event.eventName}</label>
                                    { (event.userRegistered == '' || event.userRegistered.indexOf(this.props.loggedInUserId) == -1) &&
                                        <button onClick={() => this.registerEvent(event.id,event.userRegistered)}>Register</button>
                                    }
                                </div>
                            )
                        })}
                    </div>
               }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allEvents : state.event.events,
        isSignedIn : state.auth.isSignedIn,
        existingUserId : state.user.userId,
        loggedInUserId : state.auth.userId,
    }
} 

export default connect(mapStateToProps,{UpdateRegisteredEvents,FetchEvents,FetchBMIData})(Events);