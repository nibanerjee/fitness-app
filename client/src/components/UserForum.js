import React from 'react';
import { connect } from 'react-redux';
import { CreateUserPosts,FetchUserPosts } from '../actions';
import { headerItems } from './Constants';

class UserForum extends React.Component {
    componentDidMount(){
        this.setActiveItem();
        this.interval = setInterval(() => this.props.FetchUserPosts(), 2500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
            <div className="row">
                {this.props.userPosts != null && this.props.isSignedIn ? (
                    <ul>
                        {this.props.userPosts.map((post)=> {
                            return (
                                <li>{post.content}</li>
                            )
                        })}
                    </ul>
                ) : (
                    <div>
                        No posts available.Please login to view your posts
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPosts : state.post.posts,
        isSignedIn : state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{CreateUserPosts,FetchUserPosts})(UserForum);