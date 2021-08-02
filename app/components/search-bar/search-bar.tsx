import * as React from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { palette } from "../../theme/palette"
import { translate } from "../../i18n"
import { Icon } from "react-native-elements/dist/icons/Icon"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  height: 50,
  backgroundColor: "#FFFFFFD0",
  borderColor: palette.darkred,
  borderWidth: 1,
  borderRadius: 25,
  overflow: "hidden"
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.primary,
  paddingHorizontal: 10,
  backgroundColor: "#FFFFFF",
}

export interface SearchBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,
  placeholder?: string,
  onEndEditing: any
}

/**
 * Describe your component here
 */
export function SearchBar(props: SearchBarProps) {
  const [currentText, setCurrentText] = React.useState<string>("")

  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <TextInput
        value={currentText}
        style={TEXT}
        placeholder={props.placeholder}
        onChangeText={text => {
          setCurrentText(text)
        }}
        onEndEditing={() => {
          props.onEndEditing(currentText)
        }}
      />
      {
        currentText !== "" && currentText !== null
        ? <TouchableOpacity 
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            style={{height: 20, width: 20, position:"absolute", right: 20}}
            onPress={()=>{
              setCurrentText("")
            }}  
          >
          <Icon name="close" style={{height: 20, width: 20}}/>
        </TouchableOpacity>
        : <View/>
      }
    </View>
  )
}
