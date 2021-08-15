import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { palette } from "../../theme/palette"
import { Icon } from "react-native-elements/dist/icons/Icon"

const CONTAINER: ViewStyle = {
  minHeight: 100,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

const TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: "white",
}

export interface HeaderProps {
  title: string,
  onCancel: any
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title, onCancel } = props

  return (
    <View style={CONTAINER}>
      <TouchableOpacity 
        style={{position: "absolute", right: 15, top: 10}}
        onPress={onCancel}
      >
        <Icon name="close"/>
      </TouchableOpacity>
      <Text style={TEXT}>{title}</Text>
    </View>
  )
})
