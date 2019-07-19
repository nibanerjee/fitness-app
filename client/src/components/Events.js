import React from 'react';
import { headerItems } from './Constants';
import { connect } from 'react-redux';
import { UpdateRegisteredEvents,FetchEvents,FetchBMIData} from '../actions';

class Events extends React.Component{
    componentDidMount(){
        this.setActiveItem();
        this.props.FetchEvents();
        this.props.FetchBMIData();
    }
    componentDidUpdate(prevProps,prevState){
        if((this.props.loggedInUserId !== prevProps.loggedInUserId) 
        || (this.props.existingUserId === this.props.loggedInUserId && this.state === prevState)){
            this.props.FetchBMIData();
        }
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

    registerEvent = (eventId) => {
        const registeredEvents = this.props.registeredEvents;
        const updatedEvents = (registeredEvents == '') ? (registeredEvents + eventId) : (registeredEvents + ',' + eventId);
        this.props.UpdateRegisteredEvents(updatedEvents);
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
                                    { this.props.registeredEvents.indexOf(event.eventId) == -1 &&
                                        <button onClick={() => this.registerEvent(event.eventId)}>Register</button>
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
        registeredEvents : state.user.eventsRegistered,
        allEvents : state.event.events,
        isSignedIn : state.auth.isSignedIn,
        existingUserId : state.user.userId,
        loggedInUserId : state.auth.userId,
    }
} 

export default connect(mapStateToProps,{UpdateRegisteredEvents,FetchEvents,FetchBMIData})(Events);