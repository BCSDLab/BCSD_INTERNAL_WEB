import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';
import DuesManagement from 'page/DuesManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MemberInfo />} />
      <Route path="/member-info" element={<DefaultLayout />} />
      <Route path="/dues" element={<DuesManagement />} />
    </Routes>
  );
}

export default App;
