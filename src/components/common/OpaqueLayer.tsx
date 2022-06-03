import React, { useState, useEffect, useRef } from 'react';

interface OpaqueLayerProps {
  visible: boolean;
}

function OpaqueLayer({ visible }: OpaqueLayerProps) {
  const [animate, setAnimate] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const [closed, setClosed] = useState(true);

  // activates animation & hides and unhides scrollbar
  useEffect(() => {
    // scrollbar
    document.body.style.overflowY = visible ? 'hidden' : 'initial';

    // animate
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setAnimate(true);
      timeoutId.current = setTimeout(() => {
        setAnimate(false);
        if (!visible) {
          setClosed(true);
        }
      }, 250);
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
      className={`fixed top-0 left-0 w-screen h-screen bg-white opacity-50 z-10 ${
        visible ? 'ease-in duration-200' : 'ease-out duration-200'
      }`}
    />
  );
}

export default OpaqueLayer;
