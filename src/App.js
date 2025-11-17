import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      {/* <Login />
      <Signup /> */}

      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
