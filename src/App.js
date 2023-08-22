import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from './firebase-config';
import { useState, useEffect } from "react";
import { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { AppCurso } from "./components/AppCurso";
import { AppEstudiante } from './components/AppEstudiante';
import { AppProfesor } from './components/AppProfesor';


const isAuthenticated = true;

function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
     }, reject);
  });
}

function protectedLoader({ request }) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication

  if (!getCurrentUser(auth)) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      loader() {
        // Our root route always provides the user, if logged in
        return { user: auth.currentUser };
      },
      Component: Dashboard,
    },
    {
      path: "/login",
      Component: Team,
    },
    {
      path: "/cursos",
      loader: protectedLoader,
      Component: AppCurso,
    },
    {
      path: "/estudiante",
      loader: protectedLoader,
      Component: AppEstudiante,
    },
    {
      path: "/profesor",
      loader: protectedLoader,
      Component: AppProfesor,
    },
    {
      path: "/logout",
      loader: async () =>  {
        // We signout in a "resource route" that we can hit from a fetcher.Form
        await signOut(auth);
        return redirect("/login");
      },
    },
  ]);
  
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() =>{
      onAuthStateChanged(auth, (curentUser) =>{
          setUser (curentUser);
      });
  },[]);

  const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPass);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user?(<div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
          </main>
        </div>):(

          <div className="col-2">
            <h1> Login </h1>
            <div className="form-group"><input type='email' className="form-control mb-1" placeholder='Email' onChange={(ev)=>setLoginEmail(ev.target.value)}></input></div>
            <div className="form-group"><input type='password' className="form-control mb-1" placeholder='Password' onChange={(ev)=>setLoginPass(ev.target.value)}></input></div>
            <button className='btn btn-primary' onClick={login}>Login</button>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;