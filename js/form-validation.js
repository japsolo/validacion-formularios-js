const userNameField = document.querySelector("[name=username]");
const passwordField = document.querySelector("[name=password]");
const emailField = document.querySelector("[name=email]");
const fileField = document.querySelector("[name=avatar]");

const setErrors = (message, field, isError = true) => {
  if (isError) {
    field.classList.add("invalid");
    field.nextElementSibling.classList.add("error");
    field.nextElementSibling.innerText = message;
  } else {
    field.classList.remove("invalid");
    field.nextElementSibling.classList.remove("error");
    field.nextElementSibling.innerText = "";
  }
}

const validateEmptyField = (message, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  if (fieldValue.trim().length === 0) {
    setErrors(message, field);
  } else {
    setErrors("", field, false);
  }
}

const validateEmailFormat = e => {
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
    setErrors("Please enter a valid email", field);
  } else {
    setErrors("", field, false);
  }
}

userNameField.addEventListener("blur", (e) => validateEmptyField("Add your username", e));
passwordField.addEventListener("blur", (e) => validateEmptyField("Write your password", e));
emailField.addEventListener("blur", (e) => validateEmptyField("Please provide an email", e));

emailField.addEventListener("input", validateEmailFormat);

fileField.addEventListener("change", (e) => {
  const field = e.target;
  const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
  const allowedExt = ["jpg", "jpeg", "png", "gif"];
  if (!allowedExt.includes(fileExt)) {
    setErrors(`The only extensions allowed are ${allowedExt.join(", ")}`, field);
  } else {
    setErrors("", field, false);
  }
});