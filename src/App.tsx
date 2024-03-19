import { Route, Routes } from 'react-router-dom';
import MemberInfo from 'page/MemberInfo';
import SignUp from 'page/SignUp';
import SignIn from 'page/SignIn';
import AcceptMember from 'page/Admin';
import AuthRoute from 'components/common/AuthRoute';
import DuesManagement from 'page/DuesManagement';
import DefaultLayout from 'layout/DefaultLayout';
import { Suspense, useEffect } from 'react';
import MyPage from 'page/MyPage';
import DuesSetup from 'page/DuesSetup';
import EditDues from 'page/EditDues';
import LoadingSpinner from 'layout/LoadingSpinner';
import TrackInfo from 'page/Track';
import FindPassword from 'page/FindPassword';
import Role from 'page/Role';
import { useLoginState } from 'store/loginStore';
import { PATHS } from 'util/constants/path';

function App() {
  const { setMe } = useLoginState();

  useEffect(() => {
    setMe();
  }, [setMe]);
  return (
    <Routes>
      <Route element={<AuthRoute needAuth={false} redirectRoute={PATHS.member} />}>
        <Route path={PATHS.home} element={<SignIn />} />
        <Route path={PATHS.findPassword} element={<FindPassword />} />
      </Route>
      <Route
        path={PATHS.register}
        element={(
          <Suspense fallback={<LoadingSpinner />}>
            <SignUp />
          </Suspense>
        )}
      />
      <Route element={<AuthRoute needAuth redirectRoute={PATHS.accept} />}>
        <Route element={<DefaultLayout />}>
          <Route
            path={PATHS.accept}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <AcceptMember />
              </Suspense>
            )}
          />
          <Route
            path={PATHS.member}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <MemberInfo />
              </Suspense>
            )}
          />
          <Route
            path={PATHS.myPage}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <MyPage />
              </Suspense>
            )}
          />
          <Route path={PATHS.dues} element={<DuesManagement />} />
          <Route path={PATHS.duesSetup} element={<DuesSetup />} />
          <Route path={PATHS.editDues} element={<EditDues />} />
          <Route
            path={PATHS.track}
            element={(
              <Suspense fallback={<LoadingSpinner />}>
                <TrackInfo />
              </Suspense>
            )}
          />
          <Route path={PATHS.role} element={<Role />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
