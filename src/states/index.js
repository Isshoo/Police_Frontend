// src/states/index.js

import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import classifierReducer from './classifier/reducer';
import datasetsReducer from './datasets/reducer';
import datasetDetailReducer from './datasetDetail/reducer';
import preprocessedDatasetsReducer from './preprocessedDatasets/reducer';
import preprocessedDatasetDetailReducer from './preprocessedDatasetDetail/reducer';
import modelsReducer from './models/reducer';
import modelDetailReducer from './modelDetail/reducer';
import parameterReducer from './parameter/reducer';
import vectorizedReducer from './vectorized/reducer';
import knnReducer from './knn/reducer';
import evaluationReducer from './evaluation/reducer';
import predictResultsReducer from './predictResults/reducer';

const store = configureStore({
  reducer: {
    classifier: classifierReducer,
    datasets: datasetsReducer,
    datasetDetail: datasetDetailReducer,
    preprocessedDatasets: preprocessedDatasetsReducer,
    preprocessedDatasetDetail: preprocessedDatasetDetailReducer,
    models: modelsReducer,
    modelDetail: modelDetailReducer,
    parameter: parameterReducer,
    vectorized: vectorizedReducer,
    knn: knnReducer,
    evaluation: evaluationReducer,
    predictResults: predictResultsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
