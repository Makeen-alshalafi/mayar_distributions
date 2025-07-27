import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Routes from "./Routes";
import "./utils/i18n";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;