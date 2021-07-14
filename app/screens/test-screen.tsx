import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores, withEnvironment } from "../models"
import { Api } from "../services/api"
import { palette } from "../theme/palette"
import { Image } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: palette.darkblue,
  minHeight: '100%'
}

export const TestScreen: Component = observer(function TestScreen() {
  // Pull in one of our MST stores
  const { tournamentsStore } = useStores()

  const api = Api.getInstance()

  React.useEffect(() => {
    api.getTournamentsWithName("Magna").then(res => {
      console.log("RESULT IN TEST SCREEN !!!!!!", res)
      tournamentsStore.updateTournaments(res.tournaments)
    })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      {
        tournamentsStore.tournaments.map(tournament => (
          <View style={{
            height: 150,
            flexDirection: "row",
            margin: 20,
            borderColor: palette.darkred,
            borderWidth: 2,
            borderRadius: 15,
            backgroundColor: "white",
            overflow: "hidden"
          }} key={tournament.id}>
            <Image
            style={{flex: 1}}
            source={{
              uri: tournament.images[0].url,
            }}
            />
            <Text style={{flex: 1}}>
              {tournament.name}
            </Text>
          </View>
        ))
      }
    </Screen>
  )
})
