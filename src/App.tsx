import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import DuesManagement from 'page/DuesManagement';
import DuesSetup from 'page/DuesSetup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/" element={<MemberInfo />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/member-info" element={<DefaultLayout />} />
      <Route path="/dues" element={<DuesManagement />} />
      <Route path="/dues-setup" element={<DuesSetup />} />
    </Routes>
  );
}

export default App;
