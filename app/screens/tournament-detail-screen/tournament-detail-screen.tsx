import React from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { Icon } from "react-native-elements"
import { translate } from "../../i18n"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.darkblue,
  flex: 1,
}

export const TournamentDetailScreen = observer(function TournamentDetailScreen() {

  const { tournamentDetailStore } = useStores()

  const navigation = useNavigation()
  return (
    <View style={ROOT}>

      {/* NEED TO FIND SOMETHING ABOUT WITH TEXT ON WHITE BACKGROUND */}
      <View style={{position: "absolute", zIndex: 1, height: 100, width: "100%"}}>
        <Header title={tournamentDetailStore.name} onCancel={() => {navigation.goBack()}}/>
      </View>

      <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, paddingTop: 50}}>
        <View style={{flex: 1, padding: 30}}>
          {
                tournamentDetailStore.images[0]
                ? <Image
                  style={{flex: 1, height: 100, resizeMode: "contain"}}
                  source={{
                    uri: tournamentDetailStore.images[0].url,
                  }}
                />
                :
                <View/>
              }
        </View>

        <View style={{flex: 4, backgroundColor: "white", padding: 15}}>
          <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, justifyContent:"center"}}>
                <Icon size={50} name="place"/>
              </View>
              <View style={{flex: 4, justifyContent:"center", alignItems: "flex-end"}}>
                {/* CAREFULL IF ONLINE EVENT NEED A CHECK HERE */}
                <Text style={{fontSize: 20, fontWeight: "bold"}}>
                  {tournamentDetailStore.city}, {tournamentDetailStore.countryCode}
                </Text>
              </View>
          </View>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between" , marginBottom: 20}}>
              <View style={{flex: 1}}>
                <Icon size={50} name="people"/>
              </View>
              <View style={{flex: 4, justifyContent:"center", alignItems: "flex-end"}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>
                  {tournamentDetailStore.numAttendees} {translate("tournamentDetailScreen.attendees")}
                </Text>
              </View>
          </View>

          <View style={{flex: 1, justifyContent: "center", marginBottom: 50}}>
            <Button text={translate("tournamentDetailScreen.checkBracket")} onPress={() => {
              console.log("pressed")
            }}/>
          </View>
          
          <View style={{flex: 4}}>
            <Text preset="header" style={{marginBottom: 10}}>
              {translate("tournamentDetailScreen.tournamentDescription")}
            </Text>
            <Text>
            {
              tournamentDetailStore.rules
            }
          </Text>
          </View>
        </View>
        
      </View>
    </ScrollView>
    </View>
    
  )
})
