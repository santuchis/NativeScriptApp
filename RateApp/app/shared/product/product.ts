export class Product {
    id: string;
    name: string;
    manufacturer: string;

    constructor(id: string, name: string, manufacturer: string) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
    }
}