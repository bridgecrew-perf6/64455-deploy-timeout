const AuthCredentialsSignUp = (props) => {
  const {
    handleSignUp,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
  } = props;

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default AuthCredentialsSignUp;
