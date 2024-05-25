const submitButton  = document.querySelector(".btn");
const inputField    = document.querySelectorAll(".form-field");

function escapeRegExp(string) {
  return string.replace(/[*^{}|[\]<>\\]/g, "");
  // return string.replace(/[*^{}|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

const checkForErrors = () => {
  let error = 0;
  toCheck = document.querySelectorAll(".form-field");
  toCheck.forEach(function (field) {
    if (field.value === "" || !field.value) {
      field.nextElementSibling.classList.add('show-error');
      error++;
    }; 
  });
  return error;
};

const clearErrors = () => {
  let toClear = document.querySelectorAll('.text-area');
  toClear.forEach((err) => {
    err.classList.remove("show-error");
  });
};

submitButton.addEventListener("click", (event) => {
  let error = 0;
  event.preventDefault();
  clearErrors();
  error = checkForErrors();
  if (error === 0) {
    document.querySelector("form").submit();
  };
 });


inputField.forEach((field) => {
  field.addEventListener("focusout", (event) => {
    console.log('input field loosing focus');
    event.target.value = escapeRegExp(event.target.value);
  });
})
