import React, {
  Component
} from 'react'
import {
  Navigator
} from 'react-native'
import InitialState from '../config/initial-state'
import Styles from '../src/styles'
import SignUp from './authentication/sign-up'
import SignIn from './authentication/sign-in'
import UserProfile from './settings/user-profile'
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
    this._loginUser = this._loginUser.bind(this)
    this._logoutUser = this._logoutUser.bind(this)
    this._setUserState = this._setUserState.bind(this)
  }
  renderScene(route, navigator){
    switch( route.name ){
      case 'userprofile':
        console.log('load userprofile...')
        return <UserProfile { ...{onLogOut: this._logoutUser, state: this.state.user, Firebase, route, navigator} } />
        break
      case 'signup':
        console.log('load signup...')
        return <SignUp { ...{onSignUp: this._createUser, state: this.state.signUp, Firebase, route, navigator} } />
        break
      case 'signin':
        console.log('load signin...')
        return <SignIn { ...{onSignIn: this._loginUser, state: this.state.signIn, Firebase, route, navigator} } />
        break
      default:
        console.log('load default...(<SignIn />)')
        return (
          <SignIn
            onSignIn={this._loginUser}
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
    console.log('Oh yeah! Signed up successfully! User:', u)
    this._setUserState(u)
  }
  _loginUser(u){
    console.log('Yeah yeah yeah, sign in success... User:', u)
    this._setUserState(u)
  }
  _logoutUser(){
    console.log('loggin user out...')
    this._setUserState({
      displayName: '',
      email: '',
      uid: ''
    })
  }
  _setUserState(u){
    // Set user in state
    user = this.state.user
    user.displayName = u.displayName
    user.email = u.email
    user.uid = u.uid
    this.setState({user: user})
    console.log('this.state:', this.state)
  }
}
