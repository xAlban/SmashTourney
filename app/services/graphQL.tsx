import React from "react"
import { gql } from "apollo-boost"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { useStores } from "../models"
import { View } from "react-native"
import { Text } from "../components"

export function getTournamentByNameAndCountry() {
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
  const { data, loading } = useQuery(GET_TOURNAMENT_BY_NAME_AND_COUNTRY)
  if (loading) {
    return <View style={{ background: 'black' }}>
      <Text>Loading</Text>
    </View>
  }
  const tmp = []
  console.log("data: ", data.tournaments.nodes)
  data.tournaments.nodes.map(tournament => {
    tmp.push(
      <View key={tournament.id} style={{
        flex: 1,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        margin: 30,
        padding: 10
      }}>
        <Text style={{ color: "black" }}>
                    Tournament: {tournament.name}
        </Text>
        <Text style={{ color: "black" }}>
                    City: {tournament.city}
        </Text>
      </View>
    )
  })
  return tmp

  // if (!loading) {
  //     const { tournamentsStore } = useStores()
  //     tournamentsStore.updateTournaments(data.tournaments.nodes)
  // }
}
