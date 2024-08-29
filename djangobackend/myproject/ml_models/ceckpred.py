import joblib 
import os 
from sklearn.metrics import mean_absolute_error,mean_squared_error
import pandas as pd
import matplotlib.pyplot as plt

current_path=os.path.dirname(__file__)
model_path=os.path.join(current_path,'aluminum_predictor.pkl')
model_data=joblib.load(model_path)
model=model_data['model']
feature_names=model_data['feature_names']


new_data_path=os.path.join(current_path,'newdata.csv')
new_data=pd.read_csv(new_data_path)


feature_col=new_data[['material_type','quantity_required','date_range']]
feature_col=pd.get_dummies(feature_col)
actual_tar=new_data['predicted_quality']

feature_col=feature_col.reindex(columns=feature_names,fill_value=0)

new_predections=model.predict(feature_col)


print('Mean squared error',mean_squared_error(actual_tar,new_predections))
print('Mean  absoulte error',mean_absolute_error(actual_tar,new_predections))
print('Predections',new_predections)
print('Actual target',actual_tar)

plt.figure(figsize=(10,6))
plt.plot(actual_tar,label='Actual values',marker='o')
plt.plot(new_predections,label='Predicted values',marker='x')
plt.title('Actual and Predicted values')
plt.xlabel('Data point index')
plt.ylabel('quality')
plt.legend()
plt.show()
