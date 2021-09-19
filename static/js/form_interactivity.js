"use strict";

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
  console.log("Form send");

  let form_fields = document.getElementById("form").elements;
  console.log(form_fields);

  validate_inputs(form_fields);
});

function validate_inputs(form_fields) {
  console.log(form_fields["class"].value);

  let has_error = false;

  if (
    form_fields["name"].value.trim() == "" ||
    form_fields["name"].value == null
  ) {
    console.log("Error on name");
    let input_error = document.getElementById("name");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["age"].value < 0 ||
    form_fields["age"].value > 99 ||
    form_fields["age"].value == null
  ) {
    console.log("Error on age");
    let input_error = document.getElementById("age");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["class"].value < 1 ||
    form_fields["class"].value > 3 ||
    form_fields["class"].value == null
  ) {
    console.log("Error on class");
    let input_error = document.getElementById("class");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    (form_fields["sex"].value != 0 && form_fields["sex"].value != 1) ||
    form_fields["sex"].value == null
  ) {
    console.log("Error on sex");
    let input_error = document.getElementById("sex");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["sibsp"].value < 0 ||
    form_fields["sibsp"].value > 9 ||
    form_fields["sibsp"].value == null
  ) {
    console.log("Error on sibsp");
    let input_error = document.getElementById("sibsp");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["parch"].value < 0 ||
    form_fields["parch"].value > 9 ||
    form_fields["parch"].value == null
  ) {
    console.log("Error on parch");
    let input_error = document.getElementById("parch");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["fare"].value < 0 ||
    form_fields["fare"].value > 100 ||
    form_fields["fare"].value == null
  ) {
    console.log("Error on parch");
    let input_error = document.getElementById("fare");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (
    form_fields["embarked"].value < 0 ||
    form_fields["embarked"].value > 2 ||
    form_fields["embarked"].value == null
  ) {
    console.log("Error on embarked");
    let input_error = document.getElementById("embarked");
    input_error.className += " is-invalid";
    has_error = true;
  }

  if (has_error) {
    console.log("Can not send form because it has errors");
    let modal = new bootstrap.Modal(
      document.getElementById("error-modal-form")
    );
    modal.show();

    return;
  } else {
    formSend = true;
    form_card.style.display = "none";
    result_card.style.display = "block";
  }

  const tmp_passenger = {
    Name: document.getElementById("name").value,
    Age: parseInt(form_fields["age"].value),
    Pclass: parseInt(form_fields["class"].value),
    Sex: parseInt(form_fields["sex"].value),
    SibSp: parseInt(form_fields["sibsp"].value),
    Parch: parseInt(form_fields["parch"].value),
    Fare: parseInt(form_fields["fare"].value),
    Embarked: parseInt(form_fields["embarked"].value),
  };

  send_data(tmp_passenger);
}

function send_data(passenger) {
  console.log(passenger);
  console.log("Sending data to the ML model");

  fetch("http://localhost:5000/give-prediction-info", {
    method: "POST",
    body: JSON.stringify(passenger),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      render_result(data, passenger);
    })
    .catch((error) => {
      let modal = new bootstrap.Modal(document.getElementById("error-modal"));
      modal.show();
      console.log(error);
      go_back_to_form();
    });
}

function render_result(prediction, psgData) {
  // Show the user data sended to the model
  document.getElementById("psg-data").innerHTML = `
    <li>Name: ${psgData["Name"]}</li>
    <li>Age: ${psgData["Age"]}</li>
    <li>Class: ${psgData["Pclass"]}</li>
    <li>Sex: ${psgData["Sex"] == 0 ? "Female" : "Male"}</li>
    <li>Siblings and/or wife/husband: ${psgData["SibSp"]}</li>
    <li>Parents and/or children onboard: ${psgData["Parch"]}</li>
    <li>Fare: $ ${psgData["Fare"]}</li>
    <li>Embarked: ${
      psgData["Embarked"] == 0
        ? "Queenstown"
        : psgData["Embarked"] == 1
        ? "Southampton"
        : "Cherbourg"
    }</li>
  `;

  // Show the probabilities
  let surv_prob_component = document.getElementById("surv-prob");
  let die_prob_component = document.getElementById("die-prob");

  prediction["probabilities"][0][1] = prediction["probabilities"][0][1].toFixed(2) * 100
  prediction["probabilities"][0][0] = prediction["probabilities"][0][0].toFixed(2) * 100

  surv_prob_component.innerHTML = `${prediction["probabilities"][0][1]}%`
  die_prob_component.innerHTML = `${prediction["probabilities"][0][0]}%`

  surv_prob_component.style.width = `${prediction["probabilities"][0][1]}%`
  die_prob_component.style.width = `${prediction["probabilities"][0][0]}%`

  // Shows the div with the final beredict
  let die_beredict_component = document.getElementById("die-beredict");
  let surv_beredict_component = document.getElementById("surv-beredict");

  if (prediction["beredict"][0] == 1) {
    die_beredict_component.style.display = "none";
    surv_beredict_component.style.display = "flex";
  } else {
    die_beredict_component.style.display = "flex";
    surv_beredict_component.style.display = "none";
  }
}
