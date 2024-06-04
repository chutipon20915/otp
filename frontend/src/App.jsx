import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerified = (email) => {
    setEmail(email);
    setIsVerified(true);
  };

  return (
    <div className="App">
      <header className="App-header">

      {/* <BrowserRouter>
       <Routes>
         <Route >
           <Route path="/" element={<Home />} />
           <Route path="about" element={<About />} />
           <Route path="contact" element={<Contact />} />
         </Route>
       </Routes>
     </BrowserRouter> */}
        {!isVerified ? (
          <Home onVerified={handleVerified} />
        ) : (
          // <Contact email={email} />
           <About onVerified={email} />
          // <About onVerified={handleVerified} />
        ) 
          }
      </header>
    </div>
  );
}

export default App;
