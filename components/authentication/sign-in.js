import React, {
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import InitialState from '../../config/initial-state'
import Button from '../common/button'

export default class SignIn extends Component {
  constructor(){
    super()
    this.state = InitialState().signIn
    this._onButtonPress = this._onButtonPress.bind(this)
  }

  render() {
    return <View style={styles.container}>
      <Text>Sign In</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({usernameInput: text})}
        value={this.state.usernameInput}
        />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => this.setState({passwordInput: text})}
        value={this.state.passwordInput}
        />

      <Button text={this.state.buttonText} onPress={this._onButtonPress} />
    </View>
  }

  _onButtonPress(){
    // TODO
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
  }
})
