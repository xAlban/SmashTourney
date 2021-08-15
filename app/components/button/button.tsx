import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { palette } from "../../theme/palette"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 10,
  borderColor: palette.darkred,
  minHeight: 50
}

const TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  color: color.primary,
}

export interface ButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  text: string,
  onPress: any
}

/**
 * Describe your component here
 */
export const Button = observer(function Button(props: ButtonProps) {
  const { text, onPress } = props

  return (
    <TouchableOpacity
      style={CONTAINER}
      onPress={() => {
        onPress()
      }}
    >
      <Text style={TEXT}>{text}</Text>
    </TouchableOpacity>
  )
})
