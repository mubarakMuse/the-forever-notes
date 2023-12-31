import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './NavBar'; // Import the NavBar component
import HomePage from './HomePage';
import InformationForm from './InformationForm';
import LookupForm from './LookupForm';

function App() {
  return (
    <Router>
      <NavBar /> {/* Add the NavBar component here */}
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<InformationForm />} />
          <Route path="/lookup" element={<LookupForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
