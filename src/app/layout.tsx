"use client";

import { Inter } from "next/font/google";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import { Box } from "@mui/material";
import { Email, Home } from "@mui/icons-material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
        <QueryClientProvider client={queryClient}>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                height: "100vh",
                mr: "5rem",
              }}
            >
              <Sidebar collapsed={true}>
                <Menu>
                  <MenuItem
                    icon={<Home fontSize="medium" />}
                    component={<Link href={"/dashboard"} />}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    icon={<Email fontSize="medium" />}
                    component={<Link href={"/templates"} />}
                  >
                    Templates
                  </MenuItem>
                </Menu>
              </Sidebar>
            </Box>
            {children}
          </Box>
        </QueryClientProvider>
      </body>
    </html>
  );
}
