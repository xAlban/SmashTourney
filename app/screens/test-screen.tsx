import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"
import { useQuery } from "@apollo/react-hooks"
import { gql } from 'apollo-boost'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const TestScreen: Component = observer(function TestScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const GET_PARTICIPANT_BY_TID = gql`
  {
    tournament(id: 114457) {
      id
    }
  }
`
  function testClient() {
    const { loading, error, data } = useQuery(GET_PARTICIPANT_BY_TID)
    console.log('loading: ', loading)
    console.log('error: ', error)
    console.log('data: ', data)
  }
  testClient()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" tx="testScreen.header" />
    </Screen>
  )
})
