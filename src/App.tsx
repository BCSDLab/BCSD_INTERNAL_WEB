import { Route, Routes } from 'react-router-dom';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';
import DuesManagement from 'page/DuesManagement';
import DefaultLayout from 'layout/DefaultLayout';
import DuesSetup from 'page/DuesSetup';
import EditDues from 'page/EditDues';

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute needAuth={false} redirectRoute="/member" />}>
        <Route path="/" element={<SignIn />} />
      </Route>
      <Route path="/register" element={<SignUp />} />
      <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
        <Route element={<DefaultLayout />}>
          <Route path="/accept" element={<AcceptMember />} />
          <Route path="/member" element={<MemberInfo />} />
          <Route path="/dues" element={<DuesManagement />} />
          <Route path="/dues-setup" element={<DuesSetup />} />
          <Route path="/edit-dues" element={<EditDues />} />
        </Route>
      </Route>
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
