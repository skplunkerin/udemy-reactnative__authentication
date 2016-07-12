import React, {
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Button from '../../components/common/button'

export default class UserProfile extends Component {
  constructor(props){
    super(props)
    this.state = this.props.state
    this._logUserOut = this._logUserOut.bind(this)
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.username}>Welcome to your profile, {this.state.email}</Text>
        <Button text="Logout" onPress={this._logUserOut} />
      </View>
    )
  }
  _logUserOut() {
    this.props.onLogOut()
    this.props.navigator.immediatelyResetRouteStack([{name: 'signin', loggedOut: 'You have been logged out...'}])
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    fontSize: 20,
    alignSelf: 'center'
  }
})
