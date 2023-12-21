import Team from "../models/Team.js";

export async function retrieveTeams() {
  const teams = await Team.find();
  return teams;
}
