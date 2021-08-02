import React from "react"
import { Observer, observer } from "mobx-react-lite"
import { Dimensions, FlatList, Image, ScrollView, ViewStyle } from "react-native"
import { Screen, SearchBar, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, svg } from "../../theme"
import { View } from "react-native"
import { palette } from "../../theme/palette"
import { Api } from "../../services/api"
import { useStores } from "../../models"
import { translate } from "../../i18n"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.darkblue,
  flex: 1,
  paddingTop: 50
}

const w = Dimensions.get("window").width

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
    <View style={{flex: 1}}>
    <View style={{position: "absolute", zIndex: 1, left: 10, top: 10, width: w - 20}}>
      <SearchBar 
        placeholder={translate("tournamentsScreen.searchTournament")}
        onEndEditing={text => {
          console.log("onEndEditing: ", text)
          api.getTournamentsWithName(text).then(res => {
            tournamentsStore.resetTournaments()
            tournamentsStore.updateTournaments(res.tournaments)
          })
        }}
      />
    </View>
    {/* NOT REFRESHING DYNAMICALLY NEED TO CHANGE */}
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
            {
              tournament.images[0]
              ? <Image
                style={{flex: 1}}
                source={{
                  uri: tournament.images[0].url,
                }}
              />
              :
              <View/>
            }
            <Text style={{flex: 1}}>
              {tournament.name}
            </Text>
          </View>
        ))
      }
    </ScrollView>
    </View>
  )
})
