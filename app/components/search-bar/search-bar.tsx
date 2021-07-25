import * as React from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { palette } from "../../theme/palette"
import { translate } from "../../i18n"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  height: 50,
  backgroundColor: "#FFFFFFD0",
  borderColor: palette.darkred,
  borderWidth: 1,
  borderRadius: 15
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.primary,
  paddingHorizontal: 10,
  backgroundColor: "#FFFFFF15",
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
  const [currentText, setCurrentText] = React.useState<string>()

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
    </View>
  )
}
