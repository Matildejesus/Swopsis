export const constraints = {
  userName: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 30,
      message: "^Username must be 3-30 characters long",
    },
    format: {
      pattern: "[a-z0-9 ]+",
      flags: "i",
      message: "^Usernames can only contain letters and numbers",
    },
  },
  emailAddress: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address",
    },
    email: {
      message: "^Please enter a valid email address",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Please enter a password",
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: "Password must be 8 and 12 characters long",
    },
    format: {
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,12}$",
      message:
        "^Your password must contain at least one lowercase letter, one uppercase letter, and one number",
    },
  },
  loginEmail: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address",
    },
  },
  loginPassword: {
    presence: {
      allowEmpty: false,
      message: "^Please enter a password",
    },
  },
};

export default constraints;
