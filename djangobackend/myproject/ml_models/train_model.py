from sklearn.metrics import mean_squared_error,mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import pandas as pd
import numpy as np
import os

current_directory=os.path.dirname(__file__)
file_path=os.path.join(current_directory,'alumdata.csv')
data=pd.read_csv(file_path)

x=data[['material_type','quantity_required','date_range']]
y=data['predicted_quality']

x=pd.get_dummies(x)

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)

model=RandomForestRegressor(n_estimators=100,random_state=42)


# print(model.feature_names_in_)
model.fit(x_train,y_train)

pred=model.predict(x_test)
print('Mean squaried error',mean_squared_error(y_test,pred))
print('Mean absolute error',mean_absolute_error(y_test,pred))

pickle_file_path=os.path.join(current_directory,'aluminum_predictor.pkl')

joblib.dump({
    'model':model,
    'feature_names':x.columns.tolist()
},pickle_file_path)

