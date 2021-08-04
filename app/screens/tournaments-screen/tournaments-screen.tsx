import React from "react"
import { Observer, observer } from "mobx-react-lite"
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, ViewStyle } from "react-native"
import { Screen, SearchBar, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
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
}

const w = Dimensions.get("window").width

export const TournamentsScreen = observer(function TournamentsScreen() {
  // Pull in one of our MST stores
  const { tournamentsStore, tournamentDetailStore } = useStores()

  const navigation = useNavigation()

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

    <ScrollView style={ROOT}>
      {/* This view is used to offset the first item so it's not behind the searchbar */}
      <View style={{height: 50}} />
      {
        tournamentsStore.tournaments.map(tournament => (
          <TouchableOpacity 
            style={{
              height: 150,
              margin: 20,
            }}
            key={tournament.id}
            onPress={() => {
              api.getTournamentDetail(tournament.id).then(response => {
                tournamentDetailStore.updateTournamentDetail(response.tournamentDetail[0])
                navigation.navigate("tournamentDetail")
              })
              
            }}
          >
            <View style={{
              height: 150,
              flexDirection: "row",
              borderColor: palette.darkred,
              borderWidth: 2,
              borderRadius: 15,
              backgroundColor: "white",
              overflow: "hidden"
            }}>
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
          </TouchableOpacity>
          
        ))
      }
    </ScrollView>
    </View>
  )
})
