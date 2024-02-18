import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import DuesManagement from 'page/DuesManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/member-info" element={<MemberInfo />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/dues" element={<DuesManagement />} />
    </Routes>
  );
}

export default App;
