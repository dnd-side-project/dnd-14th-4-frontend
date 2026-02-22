export interface Item {
    id: number;
    brandName: string;
    productName: string;
    satisfaction: string;
    review: string;
    reviewImagePaths: string[];
    usePeriod: string;
    purchaseLocation: string;
}

export interface GetItemsErrorResponse {
    message: string;
}