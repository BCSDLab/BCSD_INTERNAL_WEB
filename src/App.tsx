import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
        <Route path="/member" element={<MemberInfo />} />
        <Route path="/accept" element={<AcceptMember />} />
      </Route>
    </Routes>
  );
}

export default App;
