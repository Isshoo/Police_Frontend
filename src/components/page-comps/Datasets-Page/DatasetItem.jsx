import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedModel } from '../../../states/models/action';
import { setSelectedDataset } from '../../../states/datasets/action';
import { setSelectedPreprocessedDataset } from '../../../states/preprocessedDatasets/action';

const DatasetItem = ({ dataset, onDelete, deletingId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, total_data, label_counts, upload_at } = dataset;

  const handleTrain = async () => {
    dispatch(setSelectedDataset(id));
    dispatch(setSelectedPreprocessedDataset(id));
    dispatch(setSelectedModel('', ''));
    navigate('/admin/home/data-collecting');
  };

  return (
    <div className='dataset-card'>
      <div className='dataset-header'>
        <div>
          <h3 className='dataset-title'>{name}</h3>
          <p className='dataset-date'>Uploaded on {new Date(upload_at).toLocaleDateString()}</p>
        </div>
        <div className='dataset-count'>{total_data} entries</div>
      </div>

      <div className='dataset-body'>
        <div className='dataset-topics'>
          {Object.entries(label_counts).map(([topic, count]) => (
            <div key={topic} className='topic-badge'>
              <span className='topic-name'>{topic}</span>
              <span className='topic-count'>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='dataset-footer'>
        {id !== 'default-stemming' && (
          <button className='btn-delete' onClick={() => onDelete(id)} disabled={deletingId === id}>
            {deletingId === id ? 'Deleting...' : 'Delete'}
          </button>
        )}
        <button className='btn-train' onClick={handleTrain}>
          Train
        </button>
      </div>
    </div>
  );
};

DatasetItem.propTypes = {
  dataset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    total_data: PropTypes.number.isRequired,
    label_counts: PropTypes.object.isRequired,
    upload_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  deletingId: PropTypes.string,
};

export default DatasetItem;
