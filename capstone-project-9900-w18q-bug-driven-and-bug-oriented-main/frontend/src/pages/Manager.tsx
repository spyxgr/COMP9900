// home page of manager
import React, { useState, useEffect } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import NavBar from "../stories/NavBar";
import html from './dashboard'
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});

const Manager: React.FC<{}> = () => {
  document.title = 'Manager';
  // loading 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        {/* nav bar */}
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "calc(100vw - 300px)",
              height: "100vh",
              position: 'absolute',
              zIndex: 100,
              background: '#ffffff',
              left: 300
            }}
          >
            <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
          </Box>
        ) : null}
        {/* tableau page */}
        <Box sx={{ position: 'relative', zIndex: 10, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', minWidth: 1500, ml: 30 }}>
          <iframe
            id='ifra'
            title="resg"
            srcDoc={html}
            style={{ width: '100%', border: '0px', height: '100%' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            scrolling="auto"
            onLoad={() => setTimeout(() => setLoading(false), 2200)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Manager;