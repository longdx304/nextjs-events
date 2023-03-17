import { useEffect, useState } from 'react';

import CommentList from '../comment-list/comment-list.component';
import NewComment from '../new-comment/new-comment.component';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      const endpoint = `/api/comments/${eventId}`;
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    const endpoint = `/api/comments/${eventId}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    };
    const response = await fetch(endpoint, options);
    console.log(await response.json());
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
