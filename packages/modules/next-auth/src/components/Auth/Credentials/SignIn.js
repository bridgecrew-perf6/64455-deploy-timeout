const AuthCredentialsSignIn = (props) => {
  const { handleSignIn, email, setEmail, password, setPassword } = props;

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default AuthCredentialsSignIn;
