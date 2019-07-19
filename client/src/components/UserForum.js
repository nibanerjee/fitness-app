import React from 'react';
import { connect } from 'react-redux';
import { CreateUserPosts,FetchUserPosts } from '../actions';

class UserForum extends React.Component {
    componentDidMount(){

    }
    render(){
        return (
            <div className="row">
                User Forum Page
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPosts : state.post.posts
    }
}

export default connect(mapStateToProps,{CreateUserPosts,FetchUserPosts})(UserForum);