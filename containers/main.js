import React, {
  Component
} from 'react'
import {
  Navigator
} from 'react-native'
import InitialState from '../config/initial-state'
import Styles from '../src/styles'
import SignUp from '../containers/authentication/sign-up'
import SignIn from '../containers/authentication/sign-in'
import Firebase from 'firebase'

const styles = Styles()

export default class Main extends Component {
  constructor(){
    super()
    // this.state = InitialState().user
    this.state = InitialState()
    // Initialize Firebase
    Firebase.initializeApp(InitialState().firebase)
    this.renderScene = this.renderScene.bind(this)
    this._createUser = this._createUser.bind(this)
    this._setupUser = this._setupUser.bind(this)
  }
  renderScene(route, navigator){
    switch( route.name ){
      case 'signup':
        console.log('load signup...')
        return <SignUp { ...{onSignUp: this._createUser, state: this.state.signUp, Firebase, route, navigator} } />
        break
      case 'signin':
        console.log('load signin...')
        return <SignIn { ...{onSignIn: this._setupUser, state: this.state.signIn, Firebase, route, navigator} } />
        break
      default:
        console.log('load default...(<SignIn />)')
        return (
          <SignIn
            onSignIn={this._setupUser}
            Firebase={Firebase}
            state={this.state.signIn}
            route={route}
            navigator={navigator}
            />
        )
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
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight }
        />
    )
  }
  _createUser(u){
    // TODO
  }
  _setupUser(u){
    console.log('yeah, sign in success! User:', u)
    user = this.state.user
    user.displayName = u.displayName
    user.email = u.email
    user.uid = u.uid
    this.setState({user: user})
    console.log('this.state:', this.state)
  }
}
