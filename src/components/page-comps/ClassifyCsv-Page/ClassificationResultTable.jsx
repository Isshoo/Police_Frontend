import React from 'react';
import PropTypes from 'prop-types';

const ClassificationResultTable = ({
  totalData,
  classificationResult,
  classifySingleRow,
  startIndex,
  retryLoading,
}) => (
  <div className='csv-result-table'>
    <div className='csv-result-table-info'>
      <h2>Classification Results</h2>
      <p>
        <strong>Total Data:</strong> {totalData}
      </p>
    </div>
    <table>
      <colgroup>
        <col style={{ width: '4%' }} />
        <col style={{ width: '73%' }} />
        <col style={{ width: '23%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>Text</th>
          <th>Sentiment</th>
        </tr>
      </thead>
      <tbody>
        {classificationResult.map((row, index) => (
          <tr key={index}>
            <td className='numbering'>{startIndex + index + 1}</td>
            <td title={row.komentar} style={{ maxHeight: '3.6em', overflow: 'hidden' }}>
              {row.komentar}
            </td>
            <td>
              {!row.KNN || row.KNN === 'Unknown' ? (
                <button
                  className='retry-button'
                  disabled={retryLoading[startIndex + index]}
                  onClick={() => classifySingleRow(startIndex + index, row.komentar)}
                >
                  {retryLoading[startIndex + index] ? 'Retrying...' : 'Retry'}
                </button>
              ) : (
                row.KNN
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ClassificationResultTable.propTypes = {
  totalData: PropTypes.number.isRequired,
  classificationResult: PropTypes.array.isRequired,
  classifySingleRow: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  retryLoading: PropTypes.object,
};
export default ClassificationResultTable;
