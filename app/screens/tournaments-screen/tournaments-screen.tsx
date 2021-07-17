import React from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, svg } from "../../theme"
import { View } from "react-native"
import { palette } from "../../theme/palette"
import { Api } from "../../services/api"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.darkblue,
  flex: 1,
}

export const TournamentsScreen = observer(function TournamentsScreen() {
  // Pull in one of our MST stores
  const { tournamentsStore } = useStores()

  const api = Api.getInstance()

  React.useEffect(() => {
    api.getTournamentsWithName("Scarlet").then(res => {
      console.log("RESULT IN TEST SCREEN !!!!!!", res)
      tournamentsStore.updateTournaments(res.tournaments)
    })
  }, [])

  return (
    <ScrollView style={ROOT}>
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
    </ScrollView>
  )
})
