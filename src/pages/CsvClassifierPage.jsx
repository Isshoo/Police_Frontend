import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import Pages from '../components/styled/Pages';
import CsvPopup from '../components/page-comps/ClassifyCsv-Page/CsvPopup';
import Pagination from '../components/Base/Pagination';
import ClassificationResultTable from '../components/page-comps/ClassifyCsv-Page/ClassificationResultTable';
import { classifyCsvThunk, classifyRowThunk } from '../states/classifier/thunk';
import {
  setCsvData,
  editCsvRow,
  addCsvRow,
  deleteCsvRow,
  setPopupOpen,
} from '../states/classifier/action';
import { asyncFetchModels } from '../states/models/thunk';
import { setSelectedModel } from '../states/models/action';
import { setSelectedDataset } from '../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../states/preprocessedDatasets/action';

import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CsvClassifierPage = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const lastRowRef = useRef(null);

  const { csvData, classificationResult, csvLoading, isPopupOpen, retryLoading } = useSelector(
    (state) => state.classifier
  );
  const { models, selectedModelId } = useSelector((state) => state.models);

  const [resultPage, setResultPage] = useState(1);
  const [csvPage, setCsvPage] = useState(1);
  const [classifyLoading, setClassifyLoading] = useState(false);
  const rowsPerPage = 5;

  const resultStartIndex = (resultPage - 1) * rowsPerPage;
  const resultEndIndex = resultStartIndex + rowsPerPage;
  const paginatedResult = useMemo(() => {
    const start = (resultPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return classificationResult.slice(start, end);
  }, [resultPage, rowsPerPage, classificationResult]);
  const resultTotalPages = Math.ceil(classificationResult.length / rowsPerPage);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      dispatch(asyncFetchModels());
    }
  }, [dispatch]);

  useEffect(() => {
    if (csvData.length === 0 && classificationResult.length === 0) {
      dispatch(setPopupOpen(true));
    }
  }, [dispatch, csvData, classificationResult]);

  useEffect(() => {
    const totalPages = Math.ceil(csvData.length / rowsPerPage);
    if (csvPage > totalPages) {
      setCsvPage(Math.max(1, totalPages));
    }
  }, [csvData.length]);

  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.focus();
    }
  }, [csvData.length]);

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    const foundModel = models.find((model) => model.id === modelId);
    dispatch(setSelectedModel(modelId, foundModel?.model_path || ''));
    dispatch(setSelectedDataset(foundModel?.dataset_id || ''));
    dispatch(setSelectedPreprocessedDataset(foundModel?.preprocessed_dataset_id || ''));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      delimiter: ',',
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data;
        const fields = result.meta.fields || [];

        // ❌ Validasi kolom wajib 'contentSnippet'
        if (!fields.includes('komentar')) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Required Column',
            text: 'The uploaded CSV must contain a "komentar" column.',
          });
          return;
        }

        // ❌ Validasi jumlah data minimal 2
        if (parsedData.length < 2) {
          Swal.fire({
            icon: 'error',
            title: 'Insufficient Data',
            text: 'The uploaded CSV must contain at least 2 rows of data.',
          });
          return;
        }

        // ❌ Validasi error parsing dari Papaparse
        if (result.errors && result.errors.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Read CSV File',
            text: 'An error occurred while parsing the CSV file. Please ensure it is properly formatted.',
          });
          return;
        }

        // ✅ Jika valid, set data ke Redux
        dispatch(setCsvData(parsedData));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'File Upload Error',
          text: `An error occurred while reading the file: ${err.message}`,
        });
      },
    });
  };

  const handleEditCell = (index, field, value) => {
    dispatch(editCsvRow(index, field, value));
  };

  const handleAddRow = () => {
    dispatch(addCsvRow());
    const totalPages = Math.ceil((csvData.length + 1) / rowsPerPage);
    setCsvPage(totalPages);
  };

  const handleDeleteRow = (index) => {
    dispatch(deleteCsvRow(index));
    const newLength = csvData.length - 1;
    const totalPages = Math.ceil(newLength / rowsPerPage);
    if (csvPage > totalPages) {
      setCsvPage(Math.max(1, totalPages));
    }
  };

  const classifyAllCsv = async () => {
    if (csvData.length < 2) {
      Swal.fire({
        icon: 'info',
        title: 'Insufficient Data',
        text: 'Please upload at least 2 rows of data to classify.',
      });
      return;
    }
    setClassifyLoading(true);
    const response = await dispatch(classifyCsvThunk());

    if (response.error) {
      setClassifyLoading(false);
      return response;
    }

    // Reset halaman hasil ke 1
    setResultPage(1);
    dispatch(setPopupOpen(false));
    setClassifyLoading(false);
    return response;
  };

  const classifySingleRow = (index, komentar) => {
    dispatch(classifyRowThunk(index, komentar));
  };

  const handlePopup = () => {
    dispatch(setPopupOpen(!isPopupOpen));
  };

  return (
    <Pages>
      <div className='csv-page'>
        {isPopupOpen && (
          <CsvPopup
            models={models}
            selectedModelId={selectedModelId || ''}
            handleModelChange={handleModelChange}
            handleFileUpload={handleFileUpload}
            handleAddRow={handleAddRow}
            classifyAllCsv={classifyAllCsv}
            loading={csvLoading}
            csvData={csvData}
            handleEditCell={handleEditCell}
            handleDeleteRow={handleDeleteRow}
            setIsPopupOpen={handlePopup}
            totalData={csvData.length}
            totalResultData={classificationResult.length}
            currentPage={csvPage}
            setCurrentPage={setCsvPage}
            rowsPerPage={rowsPerPage}
            lastRowRef={lastRowRef}
          />
        )}

        {classificationResult.length > 0 && (
          <>
            <ClassificationResultTable
              totalData={classificationResult.length}
              classificationResult={paginatedResult}
              classifySingleRow={classifySingleRow}
              startIndex={resultStartIndex}
              retryLoading={retryLoading}
            />
            <Pagination
              currentPage={resultPage}
              totalPages={resultTotalPages}
              setCurrentPage={setResultPage}
            />
          </>
        )}
        <div className='csv-popup-button-container'>
          <button
            className={
              classificationResult.length > 0 ? 'csv-popup-button' : 'csv-popup-button none'
            }
            onClick={handlePopup}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <p className='copyright'> &copy; Copyright Batam</p>
    </Pages>
  );
};

export default CsvClassifierPage;
