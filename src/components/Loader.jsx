import React from 'react';
import { MoonLoader } from 'react-spinners';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 48,
  marginBottom: 96
};

const Loader = () => (
  <div style={loaderStyle}>
    <MoonLoader color="#74a914" loading />
  </div>
);

export default Loader;
