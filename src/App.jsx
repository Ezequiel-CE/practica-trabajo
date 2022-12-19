import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './redux/reducers/user';
import Home from './modules/Home.module';

function App() {
  const dispatcher = useDispatch();
  const generalState = useSelector((state) => state.users);

  console.log(generalState);

  useEffect(() => {
    dispatcher(getUsers());
  }, []);

  return <Home />;
}

export default App;
