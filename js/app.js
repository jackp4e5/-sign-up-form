const form = document.querySelector("#form");
const items = document.querySelectorAll(".form__item");

const firstName = document.querySelector("#first-name");
const firstMessage = document.querySelector("#first-name-error");

const lastName = document.querySelector("#last-name");
const lastMessage = document.querySelector("#last-name-error");

const email = document.querySelector("#email");
const emailMessage = document.querySelector("#email-error");

const password = document.querySelector("#password");
const passwordMessage = document.querySelector("#password-error");

const showBtn = document.querySelector("#show");
const hideBtn = document.querySelector("#hide");

const eyes = document.querySelectorAll(".eye");

const submit = document.querySelector(".form__submit");

const expresiones = {
  user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  celPhone: /^\d{7,14}$/, // 7 a 14 numeros.
};

const errors = {
  "first-name": {
    element: firstMessage,
    message: "First Name cannot be empty",
    regex: expresiones.name,
  },
  "last-name": {
    element: lastMessage,
    message: "Last Name cannot be empty",
    regex: expresiones.name,
  },
  email: {
    element: emailMessage,
    message: "Looks like this not an email",
    regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  password: {
    element: passwordMessage,
    message: "Password cannot be empty",
    regex: expresiones.password,
  },
};

const checkInputPassword = ({ target }) => {
  const { element, regex, message } = errors["password"];

  if (target.id === "password") {
    if (regex.test(target.value)) {
      password.classList.remove("error");
      password.classList.add("success");
      element.textContent = "";
      showBtn.classList.remove("hide");
    } else {
      password.classList.remove("success");
      password.classList.add("error");
      element.textContent = message;
      showBtn.classList.remove("hide");
      hideBtn.classList.add("hide");
    }
  }
};

const checkForm = ({ target }) => {
  const { element, message, regex } = errors[target.id];

  if (regex.test(target.value)) {
    target.classList.remove("error");
    target.classList.add("success");
    element.textContent = "";
  } else {
    target.classList.remove("success");
    target.classList.add("error");
    element.textContent = message;
  }
};

const isTheFormEmpty = () => {
  if ([firstName, lastName, email, password].includes("")) {
    submit.disabled = true;
    submit.classList.add("denied");
  } else {
    submit.disabled = false;
    submit.classList.remove("denied");
  }
};

document.addEventListener("DOMContentLoaded", isTheFormEmpty);

items.forEach((input) => {
  input.addEventListener("keyup", isTheFormEmpty); /* VALIDAR BOTON SUBMIT */
  input.addEventListener("blur", checkForm);
  input.addEventListener("keyup", checkInputPassword);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  items.forEach((item) => (item.className = "form__item"));
  eyes.forEach((eye) => {
    eye.classList.add("hide");
  });
  submit.disabled = true;
  submit.classList.add("denied");
  form.reset();
});

eyes.forEach((item) => {
  item.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text";
      hideBtn.classList.remove("hide");
      showBtn.classList.add("hide");
    } else {
      password.type = "password";
      hideBtn.classList.add("hide");
      showBtn.classList.remove("hide");
    }
  });
});
