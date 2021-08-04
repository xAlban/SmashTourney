import { TournamentDetailModel, TournamentDetail } from "./tournament-detail"

test("can be created", () => {
  const instance: TournamentDetail = TournamentDetailModel.create({})

  expect(instance).toBeTruthy()
})