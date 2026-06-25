import React, { useState, useEffect, useCallback } from 'react';

export function usePanelResizer(isOpen: boolean, initialWidth = 640) {
  const [panelWidth, setPanelWidth] = useState(initialWidth);

  useEffect(() => {
    const root = document.documentElement;
    const inset = isOpen && window.innerWidth >= 1024 ? `${panelWidth}px` : '0px';

    // fixed header/modals игнорируют body padding — используем CSS-переменную
    root.style.setProperty('--layout-right-inset', inset);
    root.style.transition = '--layout-right-inset 0.3s ease';

    return () => {
      root.style.removeProperty('--layout-right-inset');
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
