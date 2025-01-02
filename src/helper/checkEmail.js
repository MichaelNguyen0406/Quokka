const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

const checkEmail = (email) => {
  return emailRegex.test(email);
};

export default checkEmail;
