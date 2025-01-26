import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './page/Start';
import Login from './page/Login';
import RegisterBeneficiary from './page/Register';
import Admin from './page/Admin';
import Dashboard from './page/AdminPages/Dashboard';
import SearchRecord from './page/AdminPages/SearchRecord';
  import Department from './page/Department';
import CreateDepartment from './components/CreateDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route index element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registerbeneficiary' element={<RegisterBeneficiary />} />

        <Route path='/department' element={<Department />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="searchrecoard" element={<SearchRecord />} />
          <Route path="createacc" element={<CreateDepartment />} />
        </Route>

        {/* <Route> */}
      </Routes>
    </BrowserRouter>
  )
}


export default App;