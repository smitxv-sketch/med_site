import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AutoLandingPrototype } from './AutoLandingPrototype';

export const AutoApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AutoLandingPrototype />} />
    </Routes>
  );
};
