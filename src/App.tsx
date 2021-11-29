import styles from './App.module.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Auth from './components/Auth';
import Feed from './components/Feed';

const App: React.FC = () => {
  console.log(process.env.REACT_APP_FIREBASE_APIKEY);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          }));
      } else {
        dispatch(logout());
      }
    });
      return () => {
        unsubscribe();
      }
    }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>) : <Auth />}
    </>
  );
}

export default App;
