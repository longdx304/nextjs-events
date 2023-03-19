import { NotificationContext } from '@/contexts/notification.context';
import { useContext } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    // showing pending status
    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    // fetch user input (state or refs)
    const email = event.target.email.value;
    // optional: validate input
    // send valid data to API
    const endpoint = '/api/newsletter';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();

      // throw error ourself because server will return error response code but not throwing error
      if (response.ok) {
        showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
