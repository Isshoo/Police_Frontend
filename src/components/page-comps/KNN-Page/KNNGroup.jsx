import React from 'react';
import PropTypes from 'prop-types';
import KNNTable from './KNNTable';

const KNNGroup = ({ group, index }) => {
  return (
    <>
      <div className='knn-group-header'>
        <h3>Test Index #{index + 1}</h3>
      </div>

      <p>
        <strong>Text:</strong> {group.test_text}
      </p>
      <p>
        <strong>Actual Label:</strong> {group.true_label}
      </p>
      <p>
        <strong>Predicted Label:</strong> {group.predicted_label}
      </p>
      <KNNTable neighbors={group.neighbors} index={index} />
    </>
  );
};

KNNGroup.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default KNNGroup;
