import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";

const Auth = () => {
  const { login, register, notify } = useProductivity();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUser = username.trim();
    if (!cleanUser || !password) return;
    
    if (mode === "register" && password.length < 6) {
      notify("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await login(cleanUser, password);
        if (error) notify(error.message || "Login gagal");
      } else {
        const { error } = await register(cleanUser, password);
        if (error) {
          console.error("SUPABASE_SIGNUP_ERROR:", error);
          notify(error.message || JSON.stringify(error) || "Register gagal");
        } else {
          notify("Akun berhasil dibuat! Silakan login.");
          setMode("login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <main
        className="mx-auto max-w-sm px-4 py-6"
        style={{
          paddingTop: "calc(24px + env(safe-area-inset-top))",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="panel">
          <h1 className="pixel text-[12px] text-center" style={{ color: "var(--gold)" }}>
            Productivity Quest
          </h1>
          <p className="mt-2 text-center text-[14px]" style={{ color: "var(--mute)" }}>
            {mode === "login" ? "Masuk untuk lanjut" : "Buat akun baru"}
          </p>

          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
                Username/Email
              </label>
              <input
                className="mt-1 w-full border px-2 py-1 text-[14px] bg-transparent"
                style={{ borderColor: "var(--gold-d)", color: "var(--text)" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
                Password
              </label>
              <input
                className="mt-1 w-full border px-2 py-1 text-[14px] bg-transparent"
                type="password"
                style={{ borderColor: "var(--gold-d)", color: "var(--text)" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>
            <button className="btn btn-primary mt-2" type="submit" disabled={loading}>
              <span className="pixel text-[8px]">
                {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
              </span>
            </button>
          </form>

          <div className="mt-3 text-center text-[14px]" style={{ color: "var(--mute)" }}>
            {mode === "login" ? (
              <button
                className="underline"
                onClick={() => setMode("register")}
                disabled={loading}
              >
                Belum punya akun? Daftar
              </button>
            ) : (
              <button
                className="underline"
                onClick={() => setMode("login")}
                disabled={loading}
              >
                Sudah punya akun? Masuk
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
