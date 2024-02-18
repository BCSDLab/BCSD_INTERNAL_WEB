import { Route, Routes } from 'react-router-dom';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';
import DuesManagement from 'page/DuesManagement';
import DefaultLayout from 'layout/DefaultLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
        <Route path="/member" element={<MemberInfo />} />
        <Route element={<DefaultLayout />}>
          <Route path="/accept" element={<AcceptMember />} />
        </Route>
      </Route>
      <Route path="/member" element={<MemberInfo />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dues" element={<DuesManagement />} />
    </Routes>
  );
}

export default App;
