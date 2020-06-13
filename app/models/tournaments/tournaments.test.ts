import { TournamentsModel, Tournaments } from "./tournaments"

test("can be created", () => {
  const instance: Tournaments = TournamentsModel.create({})

  expect(instance).toBeTruthy()
})