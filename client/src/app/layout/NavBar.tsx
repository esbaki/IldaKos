import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";


type Props= {
    modeHandler: () => void;
    darkMode: boolean;
}

export default function NavBar({darkMode, modeHandler}:Props) {
   
  return (
    <AppBar
        position="fixed"
    >
        <Toolbar>
            <Typography variant="h6">ILDA Kosmetik</Typography>
            <IconButton onClick={modeHandler}>
                {darkMode ? <DarkMode></DarkMode> : <LightMode sx={{color:"yellow"}}></LightMode>}
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}