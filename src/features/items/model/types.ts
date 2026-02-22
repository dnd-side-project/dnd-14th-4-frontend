export interface ItemAddRequestDTO {
    brandName: string;
    productName: string;
    satisfaction: string;
    reviewText?: string;
    tags?: string[];
    usePeriod?: string;
    purchaseLocation?: string;
    reviewImage?: File[];
}

export interface ItemAddResponse {
    id: number;
    brandName: string;
    productName: string;
    satisfaction: string;
}

export interface ItemAddErrorResponse {
    message: string;
}