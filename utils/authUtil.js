export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return emailRegex.test(email);
  };
  