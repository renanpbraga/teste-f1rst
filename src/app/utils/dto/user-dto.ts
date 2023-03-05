export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  addressComplement: string | null;
  district: string;
  city: string;
  state: string;
}