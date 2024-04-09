"use client";

import { Inter } from "next/font/google";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { Box } from "@mui/material";
import { Email, Home } from "@mui/icons-material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

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
                }}
              >
                <Sidebar collapsed={false}>
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
                  </Menu>
                </Sidebar>
              </Box>
              <Box>{children}</Box>
            </Box>
          </QueryClientProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
