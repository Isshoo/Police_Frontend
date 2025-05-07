import React from 'react';
import PropTypes from 'prop-types';

const CsvTable = ({ csvData = 1, handleEditCell, handleDeleteRow, startIndex, lastRowRef }) => (
  <div className='csv-table'>
    <table>
      <colgroup>
        <col style={{ width: '7%' }} />
        <col style={{ width: '77%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>Content Snippet</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {csvData.map((row, index) => {
          const globalIndex = startIndex + index;
          const isLastRow = index === csvData.length - 1;

          return (
            <tr key={globalIndex}>
              <td>{globalIndex + 1}</td>
              <td>
                <input
                  type='text'
                  value={row.komentar}
                  ref={isLastRow ? lastRowRef : null}
                  onChange={(e) => handleEditCell(globalIndex, 'komentar', e.target.value)}
                />
              </td>
              <td className='csv-table-actions'>
                <button onClick={() => handleDeleteRow(globalIndex)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

CsvTable.propTypes = {
  csvData: PropTypes.array.isRequired,
  handleEditCell: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  lastRowRef: PropTypes.object,
};

export default CsvTable;
