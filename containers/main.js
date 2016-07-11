import React, {
  Component
} from 'react'
import {
  View,
  Text
} from 'react-native'
import InitialState from '../config/initial-state'
import Styles from '../src/styles'
import SignIn from '../components/authentication/sign-in'

const styles = Styles()

class Main extends Component {
  constructor(){
    super()
    this.state = InitialState().user
    this._setupUser = this._setupUser.bind(this)
  }
  render() {
    console.log('I AM HERE')
    console.log('styles.container:', styles.container)
    return <View style={styles.container}>
      <SignIn onSignIn={this._setupUser} />
    </View>
  }
  _setupUser(u){
    console.log('yeah, sign in success! User:', u)
    this.setState({
      displayName: u.displayName,
      email: u.email,
      uid: u.uid
    })
    console.log('this.state:', this.state)
  }
}

export default Main
