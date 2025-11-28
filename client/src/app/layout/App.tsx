import { useState } from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  
  const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? "dark" : "light";

  function modeHandler() {
    setDarkMode(!darkMode);
  }

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "dark" ? "radial-gradient(circle,#baecf9,#f0f9ff)" : "radial-gradient(circle,#1e3aBa,#111B27)",
      },
    },
  });

  

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <NavBar darkMode={darkMode} modeHandler={modeHandler}></NavBar>
        <Box
          sx={{
            minHeight: "100vh",
            background: !darkMode ? "radial-gradient(circle,#baecf9,#f0f9ff)" : "radial-gradient(circle,#1e3aBa,#111B27)"
          }}
          py={6}
        >
          <Container maxWidth="xl" sx={{ mt: 8 }}>
           <Outlet></Outlet>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
