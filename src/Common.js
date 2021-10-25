export function validate(name, value) {
  if (value.length === 0) {
    return "Required!!.";
  }
  switch (name) {
    case "username":
    case "fname":
    case "lname":
    case "name":
      return /^[a-zA-Z]{1,10}$/.test(value)
        ? ""
        : value.length > 10
        ? "Maximum 10 Characters"
        : `Invalid.`;
    case "taskName":
      return /^[a-zA-Z0-9 ]{1,}$/.test(value)
        ? ""
        : "Only contain alphanumeric characters.";
    case "email":
      return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
        ? ""
        : "Invalid Email.";
    case "password":
    case "confirmpassword":
      if (value.length < 8) {
        return "Password should be minimum 8 character.";
      } else {
        return /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          value
        )
          ? ""
          : "Passwod must contain 1 UpperCase Character,1 Special Character and 1 Numeric Value.";
      }
  }
}
