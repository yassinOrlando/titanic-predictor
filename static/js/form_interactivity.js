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

  let form_fields = document.getElementById("form").elements;
  console.log(form_fields);
  validate_inputs(form_fields);
  //})
});

function validate_inputs(form_fields) {
  console.log(form_fields["class"].value);

  let has_error = false;

  if (
    form_fields["name"].value.trim() == "" ||
    form_fields["name"].value == null
  ) {
    console.log("Error on name");
    has_error = true;
  }

  if (
    form_fields["age"].value < 0 ||
    form_fields["age"].value > 99 ||
    form_fields["age"].value == null
  ) {
    console.log("Error on age");
    has_error = true;
  }

  if (
    form_fields["age"].value < 0 ||
    form_fields["age"].value > 99 ||
    form_fields["age"].value == null
  ) {
    console.log("Error on age");
    has_error = true;
  }

  if (
    form_fields["class"].value < 1 ||
    form_fields["class"].value > 3 ||
    form_fields["class"].value == null
  ) {
    console.log("Error on class");
    has_error = true;
  }

  if (
    (form_fields["sex"].value != 0 && form_fields["sex"].value != 1) ||
    form_fields["sex"].value == null
  ) {
    console.log("Error on sex");
    has_error = true;
  }

  if (
    form_fields["sibsp"].value < 0 ||
    form_fields["sibsp"].value > 9 ||
    form_fields["sibsp"].value == null
  ) {
    console.log("Error on sibsp");
    has_error = true;
  }

  if (
    form_fields["parch"].value < 0 ||
    form_fields["parch"].value > 9 ||
    form_fields["parch"].value == null
  ) {
    console.log("Error on parch");
    has_error = true;
  }

  if (
    form_fields["fare"].value < 0 ||
    form_fields["fare"].value > 100 ||
    form_fields["fare"].value == null
  ) {
    console.log("Error on parch");
    has_error = true;
  }

  if (
    form_fields["embarked"].value < 0 ||
    form_fields["embarked"].value > 2 ||
    form_fields["embarked"].value == null
  ) {
    console.log("Error on embarked");
    has_error = true;
  }

  if (has_error) {
    //let modal = new bootstrap.Modal(document.getElementById("error-modal"));
    //modal.show();
    console.log("Can not send form because it has errors");
  } else {
    formSend = true;
    form_card.style.display = "none";
    result_card.style.display = "block";
  }

  let modal = new bootstrap.Modal(document.getElementById("error-modal"));
  modal.show();

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
