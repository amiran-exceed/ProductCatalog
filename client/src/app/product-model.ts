export class Product {
    constructor(
        public name: string,
        public description: string,
        public category: string,
        public price: number,
        public id?: number,
    ) {
    }
}

export interface ProductDto {
    _id: number;
    name: string;
    description: string;
    category: string;
    price: number;
}
