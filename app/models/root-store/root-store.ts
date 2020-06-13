import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TournamentsModel } from "../tournaments/tournaments"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    tournamentsStore: types.optional(TournamentsModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
