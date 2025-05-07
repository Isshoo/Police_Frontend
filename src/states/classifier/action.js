// action

// action.js
export const addPredictionEntry = (entry) => ({
  type: 'ADD_PREDICTION_ENTRY',
  payload: entry,
});

export const updateLastPrediction = (result) => ({
  type: 'UPDATE_LAST_PREDICTION',
  payload: result,
});

export const setPopupOpen = (isOpen) => ({
  type: 'SET_POPUP_OPEN',
  payload: isOpen,
});


export const setPrediction = (KNN, preprocessed) => ({
  type: 'SET_PREDICTION',
  payload: { KNN, preprocessed },
});

export const addPrediction = (text, KNN, preprocessed) => ({
  type: 'ADD_PREDICTION',
  payload: { text, KNN, preprocessed },
});

export const clearPredictions = () => ({
  type: 'CLEAR_PREDICTIONS',
});


export const setCsvData = (data) => ({
  type: 'SET_CSV_DATA',
  payload: data,
});

export const editCsvRow = (index, field, value) => ({
  type: 'EDIT_CSV_ROW',
  payload: { index, field, value },
});

export const addCsvRow = () => ({
  type: 'ADD_CSV_ROW',
});

export const deleteCsvRow = (index) => ({
  type: 'DELETE_CSV_ROW',
  payload: index,
});

export const setClassificationResult = (result) => ({
  type: 'SET_CLASSIFICATION_RESULT',
  payload: result,
});

export const updateClassificationRow = (index, field, value) => ({
  type: 'UPDATE_CLASSIFICATION_ROW',
  payload: { index, field, value },
});

export const clearCsvDataAndResult = () => ({
  type: 'CLEAR_CSV_DATA_AND_RESULT',
});

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});

export const setClassifyLoading = (isLoading) => ({
  type: 'SET_CLASSIFY_LOADING',
  payload: isLoading,
});


export const setCsvLoading = (isLoading) => ({
  type: 'SET_CSV_LOADING',
  payload: isLoading,
});

export const setRetryLoading = (index, isLoading) => ({
  type: 'SET_RETRY_LOADING',
  payload: { index, isLoading },
});

