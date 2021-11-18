export default {
  loading: 'Loading ...',
  unauthorized: {
    title: 'Sign In required',
    message: "You don't have access to this page.",
  },
  errors: {
    signIn: 'Failed to sign in',
    signUp: 'Sign up failed',
  },
  signIn: {
    button: 'Sign In',
    message: "You've are now signed in",
  },
  signOut: {
    button: 'Sign Out',
    message: "You've are now signed out",
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Name',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
    },
    password: {
      label: 'Password',
      placeholder: 'Password',
    },
  },
  credentials: {
    signIn: {
      title: 'Sign In with Password',
      button: 'Sign In',
      message: 'You are now signed in',
    },
    signUp: {
      title: 'Sign Up',
      button: 'Sign Up',
      message: 'You are now signed up',
      managed: 'You are now signed up. We will active your account soon.',
    },
  },
  email: {
    signIn: {
      title: 'Sign In with Email',
      button: 'Sign In',
      message: 'Please check your mailbox',
    },
    verification: {
      subject: 'Sign in to {{name}}',
      signInAs: 'Sign in as',
      ignoreMessage:
        'If you did not request this email you can safely ignore it.',
    },
  },
};
