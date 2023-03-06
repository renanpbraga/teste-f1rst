export interface FinancingInput {
  vehicleType: string;
    vehicleSeller: string;
    vehicleSellerName: string;
    vehicleSellerDocumentType: string;
    vehicleSellerDocumentNumber: string;
    vehicleSellerZipcode: string;
    vehicleSellerAddress: string;
    vehicleSellerAddressNumber: string;
    vehicleSellerDistrict: string;
    vehicleSellerCity: string;
    vehicleSellerState: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleManufactureYear: string;
    vehicleAveragePrice: number;
    desiredFinancingValue: number;
    financialSupport: number;
    dueDate: string;
    instalmentsNumber: number;
    acceptanceTerms?: boolean;
}