import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export function DevAuthGate() {
  return <Outlet />;
}
