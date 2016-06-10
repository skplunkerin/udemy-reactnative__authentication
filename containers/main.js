import React, {
  Component
} from 'react'
import {
  View,
  Text
} from 'react-native'
import Styles from '../src/styles'
import SignIn from '../components/authentication/sign-in'

const styles = Styles()

class Main extends Component {
  render() {
    console.log('I AM HERE')
    console.log('styles.container:', styles.container)
    return <View style={styles.container}>
      <SignIn />
    </View>
  }
}

export default Main
