import React from 'react';
import { headerItems } from './Constants';

class Events extends React.Component{
    componentDidMount(){
        this.setActiveItem();
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

    render(){
        return (
            <div className="row">Events Page</div>
        );
    }
}

export default Events;