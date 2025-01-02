export const hasSpecialCharacter = (password) => {
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(password);
};

export const hasUpperCase = (password) => {
  const regex = /[A-Z]/;
  return regex.test(password);
};

export const hasNumber = (password) => {
  const regex = /[0-9]/;
  return regex.test(password);
};

export const hasLowerCase = (password) => {
  const regex = /[a-z]/;
  return regex.test(password);
};

export const statusPassword = [
  { label: "Ít nhất 8 ký tự.", key: "minLength" },
  { label: "Ít nhất 1 chữ số.", key: "number" },
  { label: "Ít nhất 1 chữ hoa.", key: "capitalChar" },
  { label: "Ít nhất 1 chữ thường.", key: "lowercase" },
  { label: "Ít nhất 1 ký tự đặc biệt.", key: "specialChar" },
];

const checkPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return regex.test(password);
};

export default checkPassword;
