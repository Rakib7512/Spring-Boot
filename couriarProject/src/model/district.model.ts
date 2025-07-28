

export class District {
  id: string;
  name: string;
  policeStations: string[];

  constructor(id: string, name: string, policeStations: string[] = []) {
    this.id = id;
    this.name = name;
    this.policeStations = policeStations;
  }
}