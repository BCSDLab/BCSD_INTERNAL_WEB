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
import EditDues from 'page/EditDues';
import LoadingSpinner from 'layout/LoadingSpinner';
import TrackInfo from 'page/Track';
import FindPassword from 'page/FindPassword';
import Role from 'page/Role';

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute needAuth={false} redirectRoute="/member" />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Route>
      <Route
        path="/register"
        element={(
          <Suspense fallback={<LoadingSpinner />}>
            <SignUp />
          </Suspense>
        )}
      />
      <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
        <Route element={<DefaultLayout />}>
          <Route
            path="/accept"
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <AcceptMember />
              </Suspense>
            )}
          />
          <Route
            path="/member"
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <MemberInfo />
              </Suspense>
            )}
          />
          <Route
            path="/mypage"
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <MyPage />
              </Suspense>
            )}
          />
          <Route path="/accept" element={<AcceptMember />} />
          <Route path="/member" element={<MemberInfo />} />
          <Route path="/dues" element={<DuesManagement />} />
          <Route path="/dues-setup" element={<DuesSetup />} />
          <Route path="/edit-dues" element={<EditDues />} />
          <Route
            path="/track"
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <TrackInfo />
              </Suspense>
            )}
          />
          <Route path="/role" element={<Role />} />
        </Route>
      </Route>
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
