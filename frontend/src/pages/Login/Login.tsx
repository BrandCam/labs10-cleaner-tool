import axios from 'axios';
import firebase, { Unsubscribe, User } from 'firebase/app';
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import { RouteComponentProps } from 'react-router';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../../firebase.setup';
// Styles
import Container from '../../components/Container';
import LoginDiv from './Login.styling';
import queryString from 'query-string';
import { UserContext } from '../../UserContext';
import logo from '../../assets/lodgel.jpg';
import Button from '../../components/Button';

interface LoginProps extends RouteComponentProps {
  onUser: any;
}

const Login: FunctionComponent<LoginProps> = ({ history, location }) => {
  // set's up user state
  const [user, setUser] = useState<User | null>(null);
  // creates a ref that will be used as component wide variable and exists
  // throughout it's lifecycle
  const observer: MutableRefObject<any> = useRef<Unsubscribe>(null);
  // @ts-ignore
  const { state, dispatch } = useContext(UserContext);
  const setRole = (role: string) =>
    dispatch({ type: 'setRole', payload: role });
  const { ast, manager } = queryString.parse(location.search);

  // Configuration for the firebase OAuth component
  const uiConfig = {
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
    signInFlow: 'popup',
    // Render Buttons for following Providers:
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    // Set's up & removes listener to react to AuthStateChanges produced
    // by firebase
    observer.current = app
      .auth()
      .onAuthStateChanged((newUser) => setUser(newUser));

    return () => {
      if (observer.current !== null) {
        observer.current();
      }
    };
  }, [observer]);

  useEffect(() => {
    // Listens to changes in userState and submits them
    // to our backend
    submitUser();
  }, [user]);

  async function submitUser() {
    /* Commits user to the backend and redirects new users to
    either a page gathering additional information or their dashboard*/
    console.log('SUBMIT USER FIRED');
    console.log(user);
    if (user !== null) {
      const { email, uid, displayName, photoURL } = user;
      const nUser = {
        email,
        ext_it: uid,
        full_name: displayName,
        photoUrl: photoURL,
        role: ast ? 'assistant' : 'manager',
        managerID: manager,
      };
      console.log('NUSER', nUser);
      const url = process.env.REACT_APP_backendURL || 'http://localhost:54321';
      try {
        const { data } = await axios.post(`${url}/users/`, nUser);
        console.log('After post!!!!!', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('subscription', data.stripePlan);
        // TODO I think this is what's causing the intermittent
        // login issues. The entire login system needs to be redone.
        if (data.first) {
          history.push('/postreg');
          setRole(ast ? 'assistant' : 'manager');
        } else {
          history.push('/properties');
        }
      } catch (e) {
        throw e;
      }
    }
  }

  /////Test Login Code Here!!!//////////
  const managerPreset = {
    email: 'test@test.com',
    ext_it: 'd7DXFYsNwTUKFAz3acyeUkMmtYQ2',
    full_name: 'Nando Theeßen',
    photoURL: null,
    role: 'manager',
    managerID: 16,
  };
  // @ts-ignore
  const LogAsTest = async (testUser) => {
    const url = process.env.REACT_APP_backendURL || 'http://localhost:54321';
    try {
      const { data } = await axios.post(`${url}/users/`, testUser);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('subscription', data.stripePlan);
      history.push('/properties');
    } catch (e) {
      throw e;
    }
  };

  return (
    <Container>
      <LoginDiv>
        <div className='test-login-container'>
          <h1>
            To Test Functionality Please Use These Preset Users To Save Some
            Time
          </h1>
          <Button
            text='Sign in as Manager'
            onClick={() => LogAsTest(managerPreset)}
          />
          <Button disabled={true} text='Sign in as Assistant' />
          <Button disabled={true} text='Sign in as Guest' />
        </div>
        <div className='login-container'>
          <img
            src={logo}
            alt='Lodgel Logo'
            // style={{ position: 'absolute', top: '0', left: '0' }}
          />
          <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        </div>
      </LoginDiv>
    </Container>
  );
};

export default Login;
