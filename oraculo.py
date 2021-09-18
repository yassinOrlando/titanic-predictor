from typing import List
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

class Oraculo:
    def __init__(self) -> None:
        self.__knn = None
        self.__passengers_data = pd.read_csv("titanic_data/train.csv")
        self.__passengers_test_data = pd.read_csv("titanic_data/test.csv")

        self.__process_training_data()
        self.__process_test_data()

    def __process_training_data(self) -> None:
        self.__passengers_data["Sex"].replace(["female", "male"], [0,1], inplace=True)
        self.__passengers_data["Embarked"].replace(["Q", "S", "C"], [0, 1, 2], inplace=True)
        # __passengers_data["Age"].mean() = 29.69911764705882
        self.__passengers_data["Age"].replace(np.nan, 30, inplace=True) # replace all NaN from Age with 30, with is the mean of the Age

        # Creating many groups of people according to Age
        # bins from 0-8, 9-15, 9-15, 16-18, 19-25, 26-40, 41-60, 61-100
        bins = [0, 8, 15, 18, 25, 40, 60, 100]
        names = ['1', '2', '3', '4', '5', '6', '7']
        self.__passengers_data["Age"] = pd.cut(self.__passengers_data["Age"], bins, labels = names)
        self.__passengers_data.drop(["Name", "Ticket", "Cabin", "PassengerId"], axis=1, inplace=True)
        self.__passengers_data.dropna(axis=0, how='any', inplace=True)
        self.__train_model()

    def __process_test_data(self) -> None:
        self.__passengers_test_data["Sex"].replace(["female", "male"], [0,1], inplace=True)
        self.__passengers_test_data["Embarked"].replace(["Q", "S", "C"], [0, 1, 2], inplace=True)
        # __passengers_data["Age"].mean() = 29.69911764705882
        self.__passengers_test_data["Age"].replace(np.nan, 30, inplace=True) # replace all NaN from Age with 30, with is the mean of the Age

        # Creating many groups of people according to Age
        # bins from 0-8, 9-15, 16-18, 19-25, 26-40, 41-60, 61-100
        bins = [0, 8, 15, 18, 25, 40, 60, 100]
        names = ['1', '2', '3', '4', '5', '6', '7']
        self.__passengers_test_data["Age"] = pd.cut(self.__passengers_test_data["Age"], bins, labels = names)

        self.__passengers_test_data.drop(["Name", "Ticket", "Cabin", "PassengerId"], axis=1, inplace=True)
        self.__passengers_test_data.dropna(axis=0, how='any', inplace=True)

    def __train_model(self) -> None:
        # Separating the data
        x = np.array(self.__passengers_data.drop(["Survived"], 1)) # Data of passengers
        y = np.array(self.__passengers_data["Survived"]) # Survived or not

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

        self.__knn = KNeighborsClassifier(n_neighbors=3).fit(X=x_train, y=y_train)
        print(self.__knn.score(X=x_train, y=y_train))

    def get_prediction(self, passengerDict) -> List:
        # Format [2, 0, '5', 2, 1, 34.7, 1]
        # class, Sex, 5 bin of Age (19-25), SibSp, Parch, Fare, Embarked
        tmp_psg = [
            [
                passengerDict['Pclass'],
                passengerDict['Sex'],
                passengerDict['Age'],
                passengerDict['SibSp'],
                passengerDict['Parch'],
                passengerDict['Fare'],
                passengerDict['Embarked']
            ]
        ]

        beredict = self.__knn.predict(tmp_psg)
        probabilities = self.__knn.predict_proba(tmp_psg)

        return {
            "beredict": beredict.tolist(), 
            "probabilities": probabilities.tolist()
        }
