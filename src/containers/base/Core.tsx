import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import { RootState } from '../../store';
import ReactModal from 'react-modal';

if (typeof window !== 'undefined') {
  injectStyle();
}
ReactModal.setAppElement('#root');
const Core = () => {
  const { layer } = useSelector((state: RootState) => state.core);
  return (
    <>
      <OpaqueLayer visible={layer} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Core;
