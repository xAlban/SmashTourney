import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"
import { useQuery } from "@apollo/react-hooks"
import { gql } from 'apollo-boost'
import { useStores } from "../models"
import { getTournamentByNameAndCountry } from "../services/graphQL"

const ROOT: ViewStyle = {
  backgroundColor: 'white',
  minHeight: '100%'
}

export const TestScreen: Component = observer(function TestScreen() {
  // Pull in one of our MST stores
  const { tournamentsStore } = useStores()

  const [tournaments, setTournaments] = React.useState<any[]>([])

  function handleTournamentQuery(result: any[]) {
    if (result[1]) {
      tournamentsStore.updateTournaments(result[1])
      console.log('updated tournaments store and return components')
      return result[0]
    }

  }

  return (
    <Screen style={ROOT} preset="scroll">
      {
        handleTournamentQuery(getTournamentByNameAndCountry("Scarlet", "FR"))
      }
    </Screen>
  )
})
