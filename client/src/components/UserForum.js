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
        const enteredComments = this.state.userComment;
        let commentsCharArray = enteredComments.split(" ");
        commentsCharArray = commentsCharArray.filter(comment => comment.indexOf('@') > -1);
        const sourceId = this.props.userId;
        const targetId = (commentsCharArray.length) ? commentsCharArray[0].substring(1, commentsCharArray[0].length) : sourceId;
        this.props.CreateUserPosts(targetId,enteredComments);
    }
    onUserCommentChange = (e) => {
        this.setState({userComment : e.target.value})
    }

    render(){
        return (
            <div className="row">
                {this.props.userPosts != null && this.props.isSignedIn ? 
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
                                    let videoContentArray = post.content.split(" ");
                                    videoContentArray = videoContentArray.filter(content => content.indexOf('https://www.youtube.com/') > -1);
                                    const videoId = (videoContentArray.length > 0) ? videoContentArray[0].slice(-11) : null;
                                    return (
                                        <li key={i} className={"user-comment" + (post.sourceId === this.props.userId ? ' self-comment' : '')}>
                                            <div className="user-img"><i className="fas fa-user-tie"></i></div>
                                            <div className="comment-details">
                                                {post.content}
                                                {videoContentArray.length > 0 && videoId != null &&
                                                    <iframe width="100%" height="300"
                                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}>
                                                    </iframe>
                                                }
                                            </div>
                                        </li>
                                    )
                                })}
                            </div>
                        </ul>
                    </div>
                 : [(this.props.userPosts == null ?
                        <div className="no-post">
                            The posts are being fetched please wait
                        </div>
                     : 
                        <div className="no-post">
                            No posts available. Please login to view your posts
                        </div>
                     )
                    ]}
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