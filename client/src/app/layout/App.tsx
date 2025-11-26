import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7017/api/products");
        const responseData = await response.json();
        setProducts(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

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
            <Catalog products={products}></Catalog>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
