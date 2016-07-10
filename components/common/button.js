import React, {
  Component
} from 'react'
import {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress} >
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  }
})
