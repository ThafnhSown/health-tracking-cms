import React, { useEffect } from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/widgets/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import NoteDetail from './page/NoteDetail';
import ProtectedRoute from './components/widgets/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/features/userSlice';
import NotFound from './page/NotFound';
import News from './page/News';
import ListUser from './page/ListUser';
import Food from './page/Food';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // const user = "asasa";

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])


  return (
    <Router>
      <div className="md:overflow-x-auto overflow-x-hidden bg-primary">
        <section>
          <div>
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route
                  path="/home"
                  element={
                    < Home />
                  }
                />
                
                <Route
                path="/news"
                element={
                  < News />
                }
                />

                <Route
                path="/food"
                element={
                  < Food />
                }
                />

                <Route
                path="/user"
                element={
                  < ListUser />
                }
                />

              </Route>

              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={< NotFound />} />
            </Routes>
          </div>
        </section>

      </div>
    </Router>
  );
}

export default App;



