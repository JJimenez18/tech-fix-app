import { Routes, Route } from 'react-router-dom';
import { Register } from './components/Register';
import Login from './components/Login';
import JobsPage from './components/Home';
import Clients from './components/Clients';
import AddDevice from './components/AddDeviceForm';
import EditProfile from './components/EditProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={(email, password) => console.log(email, password)} />} />
      <Route path="/home" element={<JobsPage />} />
      <Route path="/addDevice" element={<AddDevice />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/register" element={<Register />} />
      <Route path="/editProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default App;
