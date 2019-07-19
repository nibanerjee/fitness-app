import React from 'react';
import { connect } from 'react-redux';
import { CreateUserPosts,FetchUserPosts } from '../actions';

class UserForum extends React.Component {
    componentDidMount(){
        this.interval = setInterval(() => this.props.FetchUserPosts(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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