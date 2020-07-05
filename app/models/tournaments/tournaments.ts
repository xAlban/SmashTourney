import { Instance, SnapshotOut, types } from "mobx-state-tree"

const Tournament = types.model({
  id: types.optional(types.number, 0),
  city: types.optional(types.string, "NO CITY"),
  countryCode: types.optional(types.string, "NO COUNTRYCODE"),
  name: types.optional(types.string, "NO NAME"),
  __typename: types.optional(types.string, "NO TYPENAME"),
})

/**
 * Model description here for TypeScript hints.
 */
export const TournamentsModel = types
  .model({
    tournaments: types.array(Tournament)
  })
  .props({})
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    updateTournaments(tournaments) {
      self.tournaments = tournaments
      console.log('UPDATED STORE TOURNAMENTS: ', self)
    },
    resetTournaments() {
      self.tournaments = []
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type TournamentsType = Instance<typeof TournamentsModel>
export interface Tournaments extends TournamentsType { }
type TournamentsSnapshotType = SnapshotOut<typeof TournamentsModel>
export interface TournamentsSnapshot extends TournamentsSnapshotType { }
