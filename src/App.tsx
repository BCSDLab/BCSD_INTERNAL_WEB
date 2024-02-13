import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/member" element={<MemberInfo />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/accept" element={<AcceptMember />} />
    </Routes>
  );
}

export default App;
