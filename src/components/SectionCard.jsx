const SectionCard = ({ title, icon, count, countLabel, action, children }) => (
  <section className="panel">
    <div
      className="mb-4 flex items-center justify-between gap-3 border-b-2 border-dashed pb-3"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--gold)" }}>{icon}</span>
        <div>
          <h2 className="pixel text-[10px]" style={{ color: "var(--gold)" }}>
            {title}
          </h2>
          <p className="mt-1 text-[13px]" style={{ color: "var(--mute)" }}>
            {count} {countLabel}
          </p>
        </div>
      </div>
      {action}
    </div>
    {children}
  </section>
);

export default SectionCard;
