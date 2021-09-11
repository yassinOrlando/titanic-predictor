from flask import Flask, render_template
import numpy as np
import pandas as pd

app = Flask(__name__)

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
