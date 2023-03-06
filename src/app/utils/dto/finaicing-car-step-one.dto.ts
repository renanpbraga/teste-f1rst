import { VehicleCategoryEnum } from "../enums/vehicle-category.enum";

export interface FinancingCarStepOne {
  vehicleYear: number,
  vehicleModelYear: number,
  isZeroKm: boolean,
  vehicleCategory: VehicleCategoryEnum,
  vehicleValue: number,
  financingValue: number,
}