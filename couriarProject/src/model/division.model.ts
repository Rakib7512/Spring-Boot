

export class Division {
  id: string;
  name: string;
  districts: string[];

  constructor(id: string, name: string, districts: string[] = []) {
    this.id = id;
    this.name = name;
    this.districts = districts;
  }
}