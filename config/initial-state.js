export default function() {
  return {
    // Replace firebase info with yours
    firebase: {
      apiKey: "AIzaSyAF7I-utolS53v0N5u0hvMeqDBAFlENGLE",
      authDomain: "udemy-react-native-auth.firebaseapp.com",
      databaseURL: "https://udemy-react-native-auth.firebaseio.com",
      storageBucket: "",
    },
    user: {
      displayName: '',
      email: '',
      uid: ''
    },
    signUp: {
      screen: 'Sign Up:',
      usernameLabel: 'Email:',
      usernameInput: '',
      passwordLabel: 'Password:',
      passwordInput: '',
      passwordConfLabel: 'Password Confirmation:',
      passwordConfInput: '',
      errorShow: false,
      errorText: '',
      buttonText: 'Sign Up!'
    },
    signIn: {
      screen: 'Sign In:',
      usernameLabel: 'Email:',
      usernameInput: '',
      passwordLabel: 'Password:',
      passwordInput: '',
      errorShow: false,
      errorText: 'Your email or password was incorrect',
      buttonText: "Sign In"
    }
  }
}
