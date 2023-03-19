import { NotificationContext } from '@/contexts/notification.context';
import { useContext, useEffect, useState } from 'react';

import CommentList from '../comment-list/comment-list.component';
import NewComment from '../new-comment/new-comment.component';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      const endpoint = `/api/comments/${eventId}`;
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending',
    });
    // send data to API
    const endpoint = `/api/comments/${eventId}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    };

    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();

      if (response.ok) {
        showNotification({
          title: 'Success!...',
          message: 'Your comment was saved!.',
          status: 'success',
        });
        return data;
      }

      throw new Error(data.message || 'Something went wrong!');
    } catch (error) {
      showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList comments={comments} />}
      {showComments && isLoading && <p>Loading....</p>}
    </section>
  );
}

export default Comments;
