"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { Box } from "@mui/material";
import { Email, Home, Image } from "@mui/icons-material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <QueryClientProvider client={queryClient}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  height: "100vh",
                  mr: "5rem",
                  w: "20%",
                }}
              >
                <Sidebar collapsed={collapsed}>
                  <Menu>
                    <MenuItem
                      icon={<Home fontSize="medium" />}
                      component={<Link href={"/dashboard"} />}
                    >
                      Home
                    </MenuItem>
                    <SubMenu
                      label="Templates"
                      icon={<Email fontSize="medium" />}
                    >
                      <MenuItem component={<Link href={"/templates/new"} />}>
                        New
                      </MenuItem>
                      <MenuItem component={<Link href={"/templates"} />}>
                        List
                      </MenuItem>
                    </SubMenu>
                    <SubMenu label="Images" icon={<Image fontSize="medium" />}>
                      <MenuItem component={<Link href={"/images/new"} />}>
                        New
                      </MenuItem>
                      <MenuItem component={<Link href={"/images"} />}>
                        List
                      </MenuItem>
                    </SubMenu>
                  </Menu>
                </Sidebar>
              </Box>
              <Box sx={{ width: "80%" }}>{children}</Box>
            </Box>
          </QueryClientProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
