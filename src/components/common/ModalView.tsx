import React from 'react';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

function ModalView({ isOpen, children, onClose }: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='w-4/5 max-h-screen bg-white overflow-auto rounded-sm flex flex-col items-center justify-center'
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <>{children}</>
    </ReactModal>
  );
}

export default ModalView;
