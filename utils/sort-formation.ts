import type { Formation } from '~/models/Game';

export const sortFormation = (response: Formation): Formation => {
  const { defenses, midfielders, forwards, goalkeeper } = response;
  midfielders.sort((a, b) => a.field_location - b.field_location);
  defenses.sort((a, b) => a.field_location - b.field_location);
  forwards.sort((a, b) => a.field_location - b.field_location);
  goalkeeper.sort((a, b) => a.field_location - b.field_location);
  response.defenses = defenses;
  response.midfielders = midfielders;
  response.forwards = forwards;
  response.goalkeeper = goalkeeper;
  return response;
};
