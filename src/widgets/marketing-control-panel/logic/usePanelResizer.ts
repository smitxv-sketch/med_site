import React, { useState, useEffect, useCallback } from 'react';

export function usePanelResizer(isOpen: boolean, initialWidth = 640) {
  const [panelWidth, setPanelWidth] = useState(initialWidth);

  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth >= 1024) {
        document.body.style.paddingRight = `${panelWidth}px`;
        document.body.style.transition = 'padding-right 0.3s ease';
      } else {
        document.body.style.paddingRight = '0px';
      }
    } else {
      document.body.style.paddingRight = '0px';
    }
    
    return () => {
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, panelWidth]);

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startX = mouseDownEvent.clientX;
    const startWidth = panelWidth;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const delta = startX - mouseMoveEvent.clientX; 
      const newWidth = Math.min(Math.max(340, startWidth + delta), window.innerWidth * 0.8);
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = 'default';
    };

    document.body.style.cursor = 'col-resize';
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [panelWidth]);

  return {
    panelWidth,
    startResizing
  };
}
