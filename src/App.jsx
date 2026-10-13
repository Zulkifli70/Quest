import { useState } from "react";
import { ProductivityProvider } from "./store/ProductivityContext";
import Header from "./components/Header";
import { Nav } from "./components/Nav";
import DailyQuests from "./components/DailyQuests";
import Habits from "./components/Habits";
import BigGoals from "./components/BigGoals";
import ToastHost from "./components/Toast";
import DevTreeOverlay from "./dev/ComponentTree";

const Dashboard = () => {
  const [tab, setTab] = useState("quests");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
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

const App = () => (
  <ProductivityProvider>
    <Dashboard />
    <DevTreeOverlay />
  </ProductivityProvider>
);

export default App;
