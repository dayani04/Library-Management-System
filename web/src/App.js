import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminRegister from './Pages/Admin/AdminRegister';
import UserLogin from './Pages/User/UserLogin';
import UserRegister from './Pages/User/UserRegister';
import UserBookDetails from './Pages/User/UserBookDetails';
import AdminBookDetails from './Pages/Admin/AdminBookDetails';
import AdminPassPapersManagemet from './Pages/Admin/AdminPassPapersManagement';

import OrdinaryLevelPassPaper from './Pages/User/OrdinaryLevelPassPaper';
import AdvancedLevelPassPaper from './Pages/User/AdvancedLevelPassPaper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/UserBookDetails" element={<UserBookDetails />} />
          <Route path="/AdminBookDetails" element={<AdminBookDetails />} />
          <Route path="/AdminPassPapersManagemet" element={<AdminPassPapersManagemet />} />

          <Route path="/ordinary-level-pass" element={<OrdinaryLevelPassPaper />} />
          <Route path="/advanced-level-pass" element={<AdvancedLevelPassPaper />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
