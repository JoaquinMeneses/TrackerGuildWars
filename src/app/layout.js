import { Inter } from "next/font/google";
import "./globals.css";

import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tracker Guild Wars",
  description: "Created by Panadero Triste",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <InitColorSchemeScript />
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
