import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, redirect, useNavigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Chiefs from "scenes/chiefs";
import Geography from "scenes/geography";
import Login from "scenes/login/login";
import getUserRole from "service/getUserRole";
import Reclamation from "components/Reclamation";
import Affectation from "components/Affectation";
import Alert from "components/Alert";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(null);
  useEffect(()=> {
      if(localToken) {
        setToken(localToken);
      }
  },[])

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }
  return (
    <div className="app">
      <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                  {!token ?
                   <Route path="/login" element={<Login setToken={setToken} token={token} />} />
                   : (  
                   <>
                    <Route path="/login" element={<Login setToken={setToken} token={token} />} />
                    <Route element={<Layout token={token} logout={logout} />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reclamation" element={<Reclamation token={token} />} />
                    <Route path="/alert" element={<Alert token={token} />} />
                    {getUserRole(token) === "admin"
                      ?
                      <>
                        <Route path="/chiefs" element={<Chiefs />} />
                        <Route path="/affectations" element={<Reclamation token={token} />} />
                      </>
                      : null
                      }
                    <Route path="/contact" element={<Geography />} />
                    </Route>
                   </>

                   )
                }
                <Route path="*" element={<Login setToken={setToken} token={token} />} />
                </Routes>
            </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
