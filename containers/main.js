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

export default class Main extends Component {
  constructor(){
    super()
    this.state = InitialState().user
    this.renderScene = this.renderScene.bind(this)
    this._setupUser = this._setupUser.bind(this)
  }
  renderScene(route, navigator){
    switch( route.name ){
      case 'signin':
        console.log('load signin...')
        return <SignIn onSignIn={this._setupUser} />
        break
      default:
        console.log('load default...(<SignIn />)')
        return <SignIn onSignIn={this._setupUser} />
    }
  }
  render() {
    console.log('I AM HERE')
    console.log('styles.container:', styles.container)
    return (
      <Navigator
        style={styles.container}
        initialRoute={ {name: 'signin', index: 0} }
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight }
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
