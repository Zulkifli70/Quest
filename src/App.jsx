import { useState } from "react";
import { ProductivityProvider } from "./store/ProductivityContext";
import Header from "./components/Header";
import DailyQuests from "./components/DailyQuests";
import Habits from "./components/Habits";
import BigGoals from "./components/BigGoals";
import { TABS } from "./components/Nav";
import DevTreeOverlay from "./dev/ComponentTree";

const Dashboard = () => {
  const [tab, setTab] = useState("quests");

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.08),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(99,102,241,0.08),transparent_40%)]" />

      <main className="relative mx-auto max-w-3xl px-4 py-8">
        <Header />

        <div className="mt-6 flex gap-2 rounded-3xl border border-slate-800 bg-slate-900/60 p-1.5">
          {TABS.map(({ id, label, icon: Icon, active, accent }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                tab === id ? `${active} ${accent}` : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "quests" && <DailyQuests />}
          {tab === "habits" && <Habits />}
          {tab === "goals" && <BigGoals />}
        </div>

        <footer className="mt-8 text-center text-xs text-slate-600">
          Productivity Quest core — v0.1
        </footer>
      </main>
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
