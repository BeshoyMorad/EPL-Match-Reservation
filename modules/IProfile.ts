export default interface Profile {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string | null;
  birthDate: Date | null;
  gender: string;
  city: string;
}
