const SectionCard = ({ title, icon, count, countLabel, accent, action, children }) => (
  <section className="flex flex-col rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-xl">
    <div className="flex items-center justify-between gap-3 border-b border-slate-700/60 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100">{title}</h2>
          <p className="text-xs text-slate-400">
            {count} {countLabel}
          </p>
        </div>
      </div>
      {action}
    </div>
    <div className="flex-1 p-5">{children}</div>
  </section>
);

export default SectionCard;
