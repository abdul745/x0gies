import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Burn, Home, Mint, NotFound, Whitelist } from '../pages';

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Mint />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="/burn" element={<Burn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
