
export class Country {
  id: string;
  name: string;
  divisions: string[];

  constructor(id: string, name: string, divisions: string[] = []) {
    this.id = id;
    this.name = name;
    this.divisions = divisions;
  }
}