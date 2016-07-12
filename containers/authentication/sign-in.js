import React, {
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import Button from '../../components/common/button'
// import InitialState from '../../config/initial-state'
// import Firebase from 'firebase'

export default class SignIn extends Component {
  constructor(props){
    super(props)
    console.log('SignIn props:', this.props)
    // this.state = InitialState().signIn
    this.state = this.props.state
    // // Initialize Firebase
    // Firebase.initializeApp(InitialState().firebase)
    this.renderError = this.renderError.bind(this)
    this.renderLoggedOut = this.renderLoggedOut.bind(this)
    this._onSigninSubmit = this._onSigninSubmit.bind(this)
    this._onSignupPress = this._onSignupPress.bind(this)
    this._onSignupReturn = this._onSignupReturn.bind(this)
  }
  renderError(){
    if (this.state.errorShow){
      return (
        <Text style={styles.error}>{this.state.errorText}</Text>
      )
    }
  }
  renderLoggedOut(){
    if (this.props.route.loggedOut){
      return (
        <Text style={styles.success}>{this.props.route.loggedOut}</Text>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.screen}</Text>
        {this.renderLoggedOut()}

        <Text style={styles.label}>{this.state.usernameLabel}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({usernameInput: text})}
          value={this.state.usernameInput}
          />

        <Text style={styles.label}>{this.state.passwordLabel}</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.setState({passwordInput: text})}
          value={this.state.passwordInput}
          />
        {this.renderError()}
        <Button text={this.state.buttonText} onPress={this._onSigninSubmit} />
        <Button text={'Create an account...'} onPress={this._onSignupPress} />
      </View>
    )
  }
  _onSigninSubmit(){
    // Sign user in
    console.log('EMAIL: ', this.state.usernameInput)
    console.log('PASSWORD: ', this.state.passwordInput)
    this.props.Firebase.auth().signInWithEmailAndPassword(this.state.usernameInput, this.state.passwordInput).catch(function(error){
      const code = error.code,
            msg = error.message
      if (code === 'auth/wrong-password'){
        this.setState({errorText: 'Incorrect password'})
      } else {
        this.setState({errorText: msg})
      }
      this.setState({
        passwordInput: '',
        errorShow: true
      })
    }.bind(this)) // bind(this) so this.setState can be called
    .then(function(u){
      console.log('user:', u)
      if (u !== undefined){
        // Successful login!
        this.setState({
          errorShow: false
        })
        this.props.onSignIn(u)
        this.props.navigator.immediatelyResetRouteStack([{name: 'userprofile'}])
      }
    }.bind(this))
  }
  _onSignupPress(){
    // Navigate to SignUp view
    this.props.navigator.push({ name: 'signup', email: this.state.usernameInput, onReturn: this._onSignupReturn })
  }
  _onSignupReturn(email){
    this.setState({usernameInput: email})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 18
  },
  input: {
    width: 200,
    height: 40,
    margin: 5,
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    alignSelf: 'center'
  },
  success: {
    alignSelf: 'center',
    color: 'blue'
  },
  error: {
    alignSelf: 'center',
    color: 'red'
  }
})
