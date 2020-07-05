import React from "react"
import { gql } from "apollo-boost"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { useStores } from "../models"
import { View } from "react-native"
import { Text } from "../components"
import { palette } from "../theme/palette"

export function getTournamentByNameAndCountry(name: string, country: string) {
  const GET_TOURNAMENT_BY_NAME_AND_COUNTRY = gql`
    {
      tournaments(query: {
        perPage: 10
        filter: {
          countryCode: "FR"
          name: "Peak"
        }
      }) {
        nodes {
          id
          name
          countryCode
          city
        }
      }
    }
  `
  const { data, loading } = useQuery(GET_TOURNAMENT_BY_NAME_AND_COUNTRY, { variables: { paramName: "Peak", paramCountry: "FR" } })
  if (loading) {
    return [<View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading</Text>
    </View>, []]
  }
  const tmp = []
  console.log("data: ", data.tournaments.nodes)
  data.tournaments.nodes.map(tournament => {
    tmp.push(
      <View key={tournament.id} style={{
        flex: 1,
        backgroundColor: palette.lightergreen,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10
      }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={{ color: "black", flex: 1, fontWeight: 'bold', marginVertical: '1%' }}>
            {tournament.name}
          </Text>
          <Text style={{ color: "black", flex: 1, marginVertical: '1%' }}>
                    City: {tournament.city}
          </Text>
        </View>
        <View style={{ flex: 4, backgroundColor: palette.darkgreen, height: 50, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <Text style={{ color: palette.grey }}>
          Image
          </Text>
        </View>
      </View>
    )
  })
  return [tmp, data.tournaments.nodes]

  // if (!loading) {
  //     const { tournamentsStore } = useStores()
  //     tournamentsStore.updateTournaments(data.tournaments.nodes)
  // }
}
