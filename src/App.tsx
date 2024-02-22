import { Route, Routes } from 'react-router-dom';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';
import DuesManagement from 'page/DuesManagement';
import DefaultLayout from 'layout/DefaultLayout';
import { Suspense } from 'react';

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute needAuth={false} redirectRoute="/member" />}>
        <Route path="/" element={<SignIn />} />
      </Route>
      <Route path="/register" element={<SignUp />} />
      <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
        <Route element={<DefaultLayout />}>
          <Route
            path="/accept"
            element={(
              <Suspense fallback={<div />}>
                <AcceptMember />
              </Suspense>
            )}
          />
          <Route
            path="/member"
            element={(
              <Suspense fallback={<div />}>
                <MemberInfo />
              </Suspense>
            )}
          />
        </Route>
      </Route>
      <Route element={<AuthRoute needAuth={false} redirectRoute="/" />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route path="/dues" element={<DuesManagement />} />
    </Routes>
  );
}

export default App;
