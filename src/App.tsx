import { Route, Routes } from 'react-router-dom';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';
import DuesManagement from 'page/DuesManagement';
import DefaultLayout from 'layout/DefaultLayout';
import { Suspense } from 'react';
import MyPage from 'page/MyPage';
import DuesSetup from 'page/DuesSetup';

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
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Route>
      <Route element={<AuthRoute needAuth={false} redirectRoute="/" />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route path="/dues" element={<DuesManagement />} />
      <Route path="/dues-setup" element={<DuesSetup />} />
    </Routes>
  );
}

export default App;
