import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Spinner.css';


const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      <ClipLoader
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;