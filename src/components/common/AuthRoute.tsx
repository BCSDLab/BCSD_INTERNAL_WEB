import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  redirectRoute: string;
  needAuth: boolean;
}

export default function AuthRoute({ needAuth, redirectRoute }: Props) {
  const token = localStorage.getItem('accessToken');

  if (needAuth && token) return <Outlet />;

  if (!needAuth && !token) return <Outlet />;

  return <Navigate to={redirectRoute} replace />;
}
