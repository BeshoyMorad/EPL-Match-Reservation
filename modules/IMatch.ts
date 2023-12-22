export default interface IMatch {
  _id: string;
  homeTeam: String;
  awayTeam: String;
  venue: String;
  dateAndTime: Date;
  mainReferee: String;
  linesman1: String;
  linesman2: String;
  homeTeamId: {
    imagePath: String;
  };
  awayTeamId: {
    imagePath: String;
  };
  venueId: {
    name: String;
    seatsPerRow: number;
    numberOfRows: number;
    _id: String;
  };
}
