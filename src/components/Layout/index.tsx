import { useAuth } from "hooks/use-auth";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";

export const Layout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Outlet />;
  return (
    <Box sx={{ marginTop: "64px" }}>
      <Navigation />
      <Outlet />
    </Box>
  );
};
