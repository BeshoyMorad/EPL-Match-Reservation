export default interface Profile {
  email: string;
  userName: string;
  role: string;
  firstName: string;
  lastName: string;
  address: string | null;
  birthDate: Date | null;
  gender: string;
  city: string;
}
