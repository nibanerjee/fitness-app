import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signIn,signOut } from '../actions';
import './AppHeader.scss';
const headerItems = [
    {
      'title': 'home',
      'class': 'home',
      'link': '/',
      'active': true
    }, {
      'title': 'bmi calculator',
      'class': 'bmi-calc',
      'link': '/bmicalc',
      'active': false
    }, {
      'title': 'training',
      'class': 'training',
      'link': '/training',
      'active': false
    }, {
      'title': 'events',
      'class': 'events',
      'link': '/events',
      'active': false
    }
  ];
class AppHeader extends React.Component{
   componentDidMount(){
       window.gapi.load('client:auth2',() => {
           window.gapi.client.init({
               clientId:'504415059984-8kjtb08nf930hntdqg2upo6nfkdusk66.apps.googleusercontent.com',
               scope:'email' 
           }).then(() => {
               this.auth = window.gapi.auth2.getAuthInstance();
               this.onAuthChange(this.auth.isSignedIn.get());
               this.auth.isSignedIn.listen(this.onAuthChange);
           });
       });
   }

   onAuthChange = (isSignedIn) =>{
       if(isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId());
       } else {
           this.props.signOut();
       }
   }

   onSignInClick = () => {
        this.auth.signIn()
   }

   onSignOutClick = () => {
        this.auth.signOut()
   }

   renderAuthButton = () => {
       if(this.props.isSignedIn == null) {
           return null;
       } else if(this.props.isSignedIn) {
           return (
               <button className="logout-btn pull-right" onClick={this.onSignOutClick}>
                   <i className="icon google"></i>
                   Sign Out
                </button>
           )
       } else {
           return (
                <button className="login-btn pull-right" onClick={this.onSignInClick}>
                    <i className="icon google"></i>
                    Sign In With Google
                </button>
           )
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

  render(){
    return (
      <div className="row header-container clearfix">
        <div className="app-name pull-left">Fitness App</div>
        {
          headerItems.map((h,i) => {
            return (
              <div onClick={this.setActiveItem} key={i} className={'pull-left ' + h.class + (h.active ? ' active' : '')}>
                <Link to={h.link}>{h.title}</Link>
              </div>
            );
          })
        }
        {this.renderAuthButton()}
      </div>
    )
  } 

}

const mapStateToProps = (state) => {
    return {
        isSignedIn : state.auth.isSignedIn
    }
}

export default connect (mapStateToProps,{signIn,signOut})(withRouter(AppHeader));