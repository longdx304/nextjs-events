import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  async function registrationHandler(event) {
    event.preventDefault();

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
    const response = await fetch(endpoint, options);
    console.log(await response.json());
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
