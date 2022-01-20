import React from 'react';
import { UseRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const {login, logout, token, userId, ready} = useAuth()

  const isAuthtenficated = !!token // перевод в булеан
  const routes = UseRoutes(isAuthtenficated)

  if(!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthtenficated }}>
      <BrowserRouter>
        { isAuthtenficated && <Navbar/>}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
