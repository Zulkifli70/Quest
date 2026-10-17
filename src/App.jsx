import { useState, useEffect } from "react";
import {
  ProductivityProvider,
  useProductivity,
} from "./store/ProductivityContext";
import Header from "./components/Header";
import { Nav } from "./components/Nav";
import DailyQuests from "./components/DailyQuests";
import Habits from "./components/Habits";
import BigGoals from "./components/BigGoals";
import ToastHost from "./components/Toast";
import Help from "./components/Help";
import Auth from "./components/Auth";
import { SunIcon, MoonIcon } from "./components/icons";

const Dashboard = () => {
  const { logout } = useProductivity();
  const [tab, setTab] = useState("quests");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("zq-theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("zq-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="mt-3 flex justify-end absolute right-5 gap-2">
        <button className="btn-logout flex items-center gap-1.5" onClick={toggleTheme}>
          {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          <span className="pixel text-[8px]">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        <button className="btn-logout" onClick={logout}>
          <span className="pixel text-[8px]">Logout</span>
        </button>
      </div>
      <main
        className="mx-auto max-w-3xl px-4 py-6"
        style={{
          paddingTop: "calc(24px + env(safe-area-inset-top))",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        }}
      >
        <Header />
        <Nav tab={tab} setTab={setTab} />

        <div className="mt-6">
          {tab === "quests" && <DailyQuests />}
          {tab === "habits" && <Habits />}
          {tab === "goals" && <BigGoals />}
        </div>

        <footer
          className="pixel mt-8 text-center text-[8px]"
          style={{ color: "var(--mute)" }}
        >
          productivity quest — v0.1
        </footer>
      </main>

      <ToastHost />
    </div>
  );
};

const Root = () => {
  const { isAuthed, loadingAuth } = useProductivity();
  if (loadingAuth) return null;
  return isAuthed ? (
    <>
      <Dashboard />
      <Help />
    </>
  ) : (
    <Auth />
  );
};

const App = () => (
  <ProductivityProvider>
    <Root />
  </ProductivityProvider>
);

export default App;
