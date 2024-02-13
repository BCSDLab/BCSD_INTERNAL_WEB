import { Route, Routes } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import SignUp from 'page/SignUp';

function App() {
  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>

  );
}

export default App;
