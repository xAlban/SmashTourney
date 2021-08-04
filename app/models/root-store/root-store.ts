import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TournamentDetailModel } from "../tournament-detail/tournament-detail"
import { TournamentsModel } from "../tournaments/tournaments"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    tournamentsStore: types.optional(TournamentsModel, {}),
    tournamentDetailStore: types.optional(TournamentDetailModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
