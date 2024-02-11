import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import MemberInfo from 'page/MemberInfo';

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<MemberInfo />} />
        <Route path="/member-info" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  );
}

export default App;
