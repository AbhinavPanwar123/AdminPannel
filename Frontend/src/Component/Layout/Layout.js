import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Container,
  Divider,
} from "@mui/material";
import {
  Home,
  People,
  Store,
  Settings,
  Logout as LogoutIcon,
  AccountCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Layout = ({ children, pageTitle }) => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear("email");
    navigate("/");
  };

  const handleProfile = () => {
    navigate('/adminProfile')
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit"  onClick={handleProfile}>
              <AccountCircle />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Profile
              </Typography>
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Logout
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              { text: "Home", icon: <Home />, path: "/dashboard" },
              { text: "Products", icon: <Store />, path: "/product" },
              { text: "Sellers", icon: <People />, path: "/seller" },
              { text: "Settings", icon: <Settings />, path: "/setting" },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
