import pandas as pd
import numpy as np

class Oraculo:
    def __init__(self) -> None:
        self.passengers_data = pd.read_csv("titanic_data/train.csv")
        self.passengers_test_data = pd.read_csv("titanic_data/test.csv")

        self.__process_training_data()
        self.__process_test_data()

    def __process_training_data(self) -> None:
        self.passengers_data["Sex"].replace(["female", "male"], [0,1], inplace=True)
        self.passengers_data["Embarked"].replace(["Q", "S", "C"], [0, 1, 2], inplace=True)
        # passengers_data["Age"].mean() = 29.69911764705882
        self.passengers_data["Age"].replace(np.nan, 30, inplace=True) # replace all NaN from Age with 30, with is the mean of the Age

        # Creating many groups of people according to Age
        # bins from 0-8, 9-15, 9-15, 16-18, 19-25, 26-40, 41-60, 61-100
        bins = [0, 8, 15, 18, 25, 40, 60, 100]
        names = ['1', '2', '3', '4', '5', '6', '7']
        self.passengers_data["Age"] = pd.cut(self.passengers_data["Age"], bins, labels = names)
        self.passengers_data.drop(["Name", "Ticket", "Cabin", "PassengerId"], axis=1, inplace=True)
        self.passengers_data.dropna(axis=0, how='any', inplace=True)

    def __process_test_data(self) -> None:
        self.passengers_test_data["Sex"].replace(["female", "male"], [0,1], inplace=True)
        self.passengers_test_data["Embarked"].replace(["Q", "S", "C"], [0, 1, 2], inplace=True)
        # passengers_data["Age"].mean() = 29.69911764705882
        self.passengers_test_data["Age"].replace(np.nan, 30, inplace=True) # replace all NaN from Age with 30, with is the mean of the Age

        # Creating many groups of people according to Age
        # bins from 0-8, 9-15, 9-15, 16-18, 19-25, 26-40, 41-60, 61-100
        bins = [0, 8, 15, 18, 25, 40, 60, 100]
        names = ['1', '2', '3', '4', '5', '6', '7']
        self.passengers_test_data["Age"] = pd.cut(self.passengers_test_data["Age"], bins, labels = names)

        self.passengers_test_data.drop(["Name", "Ticket", "Cabin", "PassengerId"], axis=1, inplace=True)
        self.passengers_test_data.dropna(axis=0, how='any', inplace=True)
