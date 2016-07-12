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

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.state
    this.renderError = this.renderError.bind(this)
    this._onSignupSubmit = this._onSignupSubmit.bind(this)
    this._onSignPress = this._onSignPress.bind(this)
  }
  componentWillMount(){
    // If user typed email on login, then came to signup...
    // use that email to speed things up.
    this.setState({usernameInput: this.props.route.email})
  }
  renderError() {
    if (this.state.errorShow) {
      return (
        <Text style={styles.error}>{this.state.errorText}</Text>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up here</Text>

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

        <Text style={styles.label}>{this.state.passwordConfLabel}</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.setState({passwordConfInput: text})}
          value={this.state.passwordConfInput}
          />
          {this.renderError()}
          <Button text={this.state.buttonText} onPress={this._onSignupSubmit} />
          <Button text={'Wait, I have an account...'} onPress={this._onSignPress} />
      </View>
    )
  }
  _onSignupSubmit(){
    // TODO: 1. Check if password && passwordConf match
    //       2. Sign User Up if passed, show errors if any
    //       3. Show error that passwords don't match
    console.log('EMAIL: ', this.state.usernameInput)
    console.log('PASSWORD: ', this.state.passwordInput)
    console.log('PASSWORDCONF: ', this.state.passwordConfInput)
    if (this.state.passwordInput !== this.state.passwordConfInput) {
      return this.setState({
        passwordInput: '',
        passwordConfInput: '',
        errorText: "Passwords didn't match!",
        errorShow: true
      })
    }
    this.props.Firebase.auth().createUserWithEmailAndPassword(this.state.usernameInput, this.state.passwordInput).catch(function(error){
      const code = error.code,
            msg = error.message
      if (code === 'auth/weak-password'){
        this.setState({errorText: 'Password is too weak...'})
      } else {
        this.setState({errorText: msg})
      }
      this.setState({
        passwordInput: '',
        passwordConfInput: '',
        errorShow: true
      })
    }.bind(this)) // bind(this) so this.setState can be called
    .then(function(u){
      console.log('user:', u)
      if (u !== undefined){
        // Successfully created user!
        this.setState({
          errorShow: false
        })
        // TODO, pass u back to where it'll be used
      }
    }.bind(this))
  }
  _onSignPress(){
    // Before popping, send email (if any typed)
    this.props.route.onReturn(this.state.usernameInput)
    this.props.navigator.pop()
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  error: {
    alignSelf: 'center',
    color: 'red'
  }
})
