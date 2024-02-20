import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import DuesManagement from 'page/DuesManagement';
import DuesSetup from 'page/DuesSetup';
import EditDues from 'page/EditDues';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/member" element={<MemberInfo />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/member-info" element={<DefaultLayout />} />
      <Route path="/dues" element={<DuesManagement />} />
      <Route path="/dues-setup" element={<DuesSetup />} />
      <Route path="edit-dues" element={<EditDues />} />
    </Routes>
  );
}

export default App;
