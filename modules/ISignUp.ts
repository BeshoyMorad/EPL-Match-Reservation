export default  interface UserSignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  lastName: string;
  address: string | null;
  birthDate: Date | null;
  gender: string;
  city: string;
}
