import { useLocation, useNavigate } from "react-router-dom";

function SignIn({ onSignIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    onSignIn();

    navigate(from, { replace: true });
  }

  return (
    <section>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            required
          />
        </label>

        <br />
        <br />

        <label>
          Email
          <input
            type="email"
            required
          />
        </label>

        <br />
        <br />

        <button type="submit">
          Sign In
        </button>
      </form>
    </section>
  );
}

export default SignIn;