import React, {
  Component
} from 'react'
import {
  Navigator
} from 'react-native'
import InitialState from '../config/initial-state'
import Styles from '../src/styles'
import SignIn from '../components/authentication/sign-in'

const styles = Styles()

class Main extends Component {
  constructor(){
    super()
    this.state = InitialState().user
    this.renderScene = this.renderScene.bind(this)
    this._setupUser = this._setupUser.bind(this)
  }
  renderScene(route, navigator){
    console.log('route:', route)
    console.log('navigator:', navigator)
    console.log('(route.name == "signin")', (route.name == 'signin'))
    switch( route.name ){
      case 'signin':
        console.log('load signin...')
        return <SignIn onSignIn={this._setupUser} />
        break
      default:
        console.log('load default...')
        return <SignIn onSignIn={this._setupUser} />
    }
  }
  render() {
    console.log('I AM HERE')
    console.log('styles.container:', styles.container)
    return (
      <Navigator
        style={styles.container}
        initialRoute={ {name: 'signin'} }
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight }}
        />
    )
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
