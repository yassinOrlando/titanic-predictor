from flask import Flask, render_template, jsonify, request
from flask_cors import cross_origin
import numpy as np
import pandas as pd

from oraculo import Oraculo

app = Flask(__name__)

oraculo = Oraculo() # Instance of object with the ML algorithm

@app.route("/")
def home():
    return render_template('pages/home.html')

@app.route("/about")
def about():
    return render_template('pages/about.html')

@app.route("/datasets")
def datasets():
    passengers_data = pd.read_csv("titanic_data/train.csv")
    passengers_test_data = pd.read_csv("titanic_data/test.csv")

    return render_template('pages/datasets.html', 
        training_table=[passengers_data.to_html(classes='data', header="true")], 
        test_table=[passengers_test_data.to_html(classes='data', header="true")]
    )

@app.route("/interesting-statistics")
def plots():
    return render_template('pages/plots.html')

@app.route("/prediction")
def predictions_page():
    return render_template('pages/prediction.html')

@app.route("/give-prediction-info", methods=['GET', 'POST'])
@cross_origin()
def give_prediction():
    data = request.get_json()

    # Put the age in its correspondent bin
    if(0 <= data["Age"] <= 8):
        data["Age"] = '1'
    elif(9 <= data["Age"] <= 15):
        data["Age"] = '2'
    elif(16 <= data["Age"] <= 18):
        data["Age"] = '3'
    elif(19 <= data["Age"] <= 25):
        data["Age"] = '4'
    elif(26 <= data["Age"] <= 40):
        data["Age"] = '5'
    elif(41 <= data["Age"] <= 60):
        data["Age"] = '6'
    elif(61 <= data["Age"] <= 100):
        data["Age"] = '7'
    elif(data["Age"] < 0):
        data["Age"] = '1'

    passenger_data = {
        "Pclass": data["Pclass"],
        "Sex": data["Sex"],
        "Age": data["Age"],
        "SibSp": data["SibSp"],
        "Parch": data["Parch"],
        "Fare": data["Fare"],
        "Embarked": data["Embarked"]
    }

    prediction = oraculo.get_prediction(passenger_data)
    
    return jsonify(prediction)
