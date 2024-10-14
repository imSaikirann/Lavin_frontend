export interface Variant {
    size: string;
    price: number;
    stock: number;
    color: string;
}

export interface Review {
    rating: number;
    comment: string;
}


export interface Products {
    id: string;
    productName: string;
    productDescription: string;
    categoryId: string;
    bestSeller: boolean;
    images: string[];
    variants: Variant[];
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
}