import React from 'react';
import { connect } from 'react-redux';
import { CreateUserPosts,FetchUserPosts } from '../actions';
import { headerItems } from './Constants';
import './userForum.scss';

class UserForum extends React.Component {
    state = {
        userComment : ''
    }

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

    postCommentHandler = () => {
        console.log('post comment',this.state.userComment);
        //this.props.CreateUserPosts();
    }
    onUserCommentChange = (e) => {
        this.setState({userComment : e.target.value})
    }

    render(){
        return (
            <div className="row">
                {this.props.userPosts != null && this.props.isSignedIn ? (
                    <div className="post-challenge-wrapper row">
                        <div className="add-challenge col-sm-6">
                            <div>
                                <div className="title">Post a Challenge</div>
                                <textarea rows="6" placeholder="Post a comment or enter a youtube video URL" value={this.state.userComment} onChange={(e) => this.onUserCommentChange(e)}>
                                </textarea>
                                <button onClick={this.postCommentHandler} className="post-btn pull-right">POST</button>
                                </div>
                        </div>
                        <ul className="user-comments-wrapper col-sm-6">
                            <div>
                                <div className="title">User Forum Discussion</div>
                                {this.props.userPosts.map((post, i)=> {
                                    return (
                                        <li key={i} className={"user-comment" + (post.sourceId === this.props.userId ? ' self-comment' : '')}>
                                            <div className="user-img"><i className="fas fa-user-tie"></i></div>
                                            <div className="comment-details">
                                                {post.content}
                                                <iframe width="100%" height="300"
                                                    src="https://www.youtube.com/embed/fcN37TxBE_s?autoplay=1">
                                                </iframe>
                                            </div>
                                        </li>
                                    )
                                })}
                            </div>
                        </ul>
                    </div>
                ) : (
                    <div>
                        No posts available. Please login to view your posts
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPosts : state.post.posts,
        isSignedIn : state.auth.isSignedIn,
        userId : state.auth.userId
    }
}

export default connect(mapStateToProps,{CreateUserPosts,FetchUserPosts})(UserForum);