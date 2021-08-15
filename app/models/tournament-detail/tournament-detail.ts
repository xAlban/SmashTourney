import { Instance, SnapshotOut, types } from "mobx-state-tree"

const Image = types.model({
  url: types.optional(types.maybeNull(types.string), "")
})

/**
 * Model description here for TypeScript hints.
 */
export const TournamentDetailModel = types
  .model("Tournament Detail")
  .props({
    id: types.optional(types.number, 0),
    city: types.optional(types.maybeNull(types.string), "NO CITY"),
    countryCode: types.optional(types.maybeNull(types.string), "NO COUNTRYCODE"),
    name: types.optional(types.maybeNull(types.string), "NO NAME"),
    __typename: types.optional(types.maybeNull(types.string), "NO TYPENAME"),
    images: types.optional(types.array(Image), [{url: ""}]),
    rules: types.optional(types.maybeNull(types.string), "NO RULES"),
    numAttendees: types.optional(types.number, 0),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    updateTournamentDetail(tournament) {
      self.id = tournament.id
      self.city = tournament.city
      self.countryCode = tournament.countryCode
      self.name = tournament.name
      self.__typename = tournament.__typename
      self.images = tournament.images
      self.rules = tournament.rules
      self.numAttendees = tournament.numAttendees
      console.log('UPDATED DETAIL STORE: ', self)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TournamentDetailType = Instance<typeof TournamentDetailModel>
export interface TournamentDetail extends TournamentDetailType {}
type TournamentDetailSnapshotType = SnapshotOut<typeof TournamentDetailModel>
export interface TournamentDetailSnapshot extends TournamentDetailSnapshotType {}
