import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MenuAdmin from './components/MenuAdmin';
import MenuEmployee from './components/MenuEmployee';
import RegisEmployee from './pages/employee/RegistrasiEmployee.jsx';
import ListEmployee from './pages/admin/ListEmployee';
import SalaryEmployee from './pages/employee/SalaryEmployee.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/menu-employee/:userID" element={<MenuEmployee />} />
        <Route path="/regis/:token" element={<RegisEmployee/>} />
        <Route path="/admin/employees" element={<ListEmployee/>} />
        <Route path="/employee/salary/:userID" element={<SalaryEmployee/>} />
      </Routes>
    </>
  );
}

export default App;