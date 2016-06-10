import React, {
  Component
} from 'react'
import {
  View,
  Text
} from 'react-native'
import Styles from '../src/styles'

const styles = Styles()

class Main extends Component {
  render() {
    console.log('I AM HERE')
    console.log('styles.container:', styles.container)
    return <View style={styles.container}>
      <Text>I am on both iOS and Android!</Text>
    </View>
  }
}

export default Main
