import React, { useLayoutEffect } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  AddAlertOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import getUserRole from "service/getUserRole";

const navItems = [  {
    text: "Intercom Dashboard",
    icon: <HomeOutlined />,
    path: "dashboard"
  },
  {
    text: "Chargée D  'affaire ",
    icon: null,
  },

  {
    text: "Liste des Chargées D'affaire ",
    icon: <Groups2Outlined />, 
    path: 'chiefs'
  },
  {
    text: "Affectation   ",
    icon: <Groups2Outlined />,
    path: '/affctation'
  },
  {
    text: "Réclamation  ",
    icon: <Groups2Outlined />,
    path: 'reclamation'
  },
  {
    text: "Alert",
    icon: <AddAlertOutlined />,
    path: 'alert'
  },
  {
    text: " Contactez-nous",
    icon: <PublicOutlined />,
    path: "contact"
  }];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  token
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(()=> {
    console.log(getUserRole(token))
 
  },[])
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);



  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    <img
                      src="https://academy-focus.com/wp-content/uploads/2020/11/Logo-intercom-technologies-fonc%C3%A9-png-1.png"
                      alt="logo"
                      style={{ width: "120px", marginTop: "-30%" }}
                    />
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.filter(({ text }) => {
                  if(getUserRole(token) === "admin"){
                      return true
                  }
                  else if (getUserRole(token) === "user"){
                      return [" Contactez-nous","Réclamation  ","Intercom Dashboard","Alert"].includes(text)
                  }
                  return false
              }).map(({ text, icon, path }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate({pathname:`${path}`});
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText ? "#A3A0B3" : "transparent",
                          color:
                            active === lcText
                              ? "white"
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? "white"
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
