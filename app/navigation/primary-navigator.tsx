/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SettingsScreen, TestScreen, TournamentDetailScreen, TournamentsScreen, UsersScreen } from "../screens"
import { palette } from "../theme/palette"
import { svg } from "../theme"
import { View } from "react-native"
import { Text } from "../components"
import { translate } from "../i18n"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  test: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const TournamentsStack = createNativeStackNavigator<PrimaryParamList>()

function TournamentsStackScreen() {
  return (
    <TournamentsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <TournamentsStack.Screen 
          name="tournaments"
          component={TournamentsScreen}
        />
        <TournamentsStack.Screen 
          name="tournamentDetail"
          component={TournamentDetailScreen}
        />
    </TournamentsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export function PrimaryNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent = <View/>
          if (route.name === 'tournaments') {
            iconComponent = <svg.TournamentIcon height="70%"/>
          } else if (route.name === 'settings') {
            iconComponent = <svg.Settings height="70%"/>
          } else if (route.name === 'users') {
            iconComponent = <svg.GroupUser height="70%"/>
          }

          // You can return any component that you like here!
          return <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
            {iconComponent}
            </View>
        },
        tabBarLabel: ({focused}) => {
          return <Text style={{fontSize: 12, color: focused ? "white": "black"}}>{route.name}</Text>
        }
      })}
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: palette.selecteddarkred,
        inactiveBackgroundColor: palette.darkred,
        activeTintColor: "white",
        inactiveTintColor: "black",
        style:{
          borderTopWidth: 0
        }
      }}
      
    >
      
      <Tab.Screen 
        name="tournaments"
        component={TournamentsStackScreen}
        options={{
          tabBarLabel: translate("tournaments")
        }} 
      />
      <Tab.Screen 
        name="users"
        component={UsersScreen}
        options={{
          tabBarLabel: translate("players")
        }} 
      />
      <Tab.Screen 
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: translate("settings")
        }} 
      />
    </Tab.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
