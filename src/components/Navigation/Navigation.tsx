import { AppBar, Toolbar, Button, Box, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

export const Navigation = () => (
  <AppBar position="fixed" component="nav">
    <Toolbar>
      <Button component={Link} to="/">
        Washoe
      </Button>
      <Box ml="auto" display="flex" gap={1}>
        <Button component={Link} to="/add-word">
          Add Word
        </Button>
        <Button component={Link} to="/my-words">
          My Words
        </Button>
      </Box>
    </Toolbar>
    <CssBaseline />
  </AppBar>
);
