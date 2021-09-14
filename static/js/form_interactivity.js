let formSend = false;
let form = document.getElementById("form");
let form_card = document.getElementById("form-card");
let result_card = document.getElementById("result-card");

/*if (formSend) {
  form_card.style.display = "none";
  result_card.style.display = "block";
} else {
  form_card.style.display = "block";
  result_card.style.display = "none";
} */

function go_back_to_form() {
  formSend = false;

  form_card.style.display = "block";
  result_card.style.display = "none";
  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //self.fields.forEach(field => {
  //const input = document.querySelector(`#${field}`)
  //self.validateFields(input)
  console.log("Form send");
  formSend = true;
  form_card.style.display = "none";
  result_card.style.display = "block";
  //})
});

function validate_inputs() {
  const tmp_passenger = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    psgClass: document.getElementById("class").value,
    sex: document.getElementById("sex").value,
    sibsp: document.getElementById("sibsp").value,
    parch: document.getElementById("parch").value,
    fare: document.getElementById("fare").value,
    embarked: document.getElementById("embarked").value,
  };

  // Here I will add the input validations
}

function sendData(passenger) {
  console.log(passenger);
  console.log("Sending data to the ML model");
}
