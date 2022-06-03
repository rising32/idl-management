import React, { useState, useEffect, useRef } from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface OpaqueLayerProps {
  visible: boolean;
}

function OpaqueLayer({ visible }: OpaqueLayerProps) {
  const [animate, setAnimate] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';

    if (!mounted.current) {
      mounted.current = true;
    } else {
      setAnimate(true);
      timeoutId.current = setTimeout(() => {
        setAnimate(false);
        if (!visible) {
          setClosed(true);
        }
      }, 50);
    }

    if (visible) {
      setClosed(false);
    }

    return () => {
      if (!timeoutId.current) return;
      clearTimeout(timeoutId.current);
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  if (!animate && !visible && closed) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-screen flex h-screen bg-black items-center justify-center opacity-50 z-10 ${
        visible ? 'ease-in duration-200' : 'ease-out duration-200'
      }`}
    >
      <RotatingLines width='30' strokeColor='white' />
    </div>
  );
}

export default OpaqueLayer;
