import { useState, useEffect } from "react";
import { COMPONENT_MAP } from "./componentMap";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";

const TreeNode = ({ node, depth = 0 }) => {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <button
        onClick={() => hasChildren && setOpen((o) => !o)}
        className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-slate-800/70 ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDownIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          ) : (
            <ChevronUpIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          )
        ) : (
          <span className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        )}
        <span className="min-w-0">
          <span className="block truncate font-mono text-xs font-semibold text-slate-200">
            {node.name}
          </span>
          <span className="block truncate text-[10px] text-slate-500">{node.file}</span>
          {node.role && (
            <span className="mt-0.5 block text-[10px] leading-snug text-slate-400">{node.role}</span>
          )}
          {node.uses && (
            <span className="mt-1 flex flex-wrap gap-1">
              {node.uses.map((u) => (
                <span key={u} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
                  {u}
                </span>
              ))}
            </span>
          )}
        </span>
      </button>
      {open && hasChildren && (
        <div>
          {node.children.map((c) => (
            <TreeNode key={c.name + c.file} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const DevTreeOverlay = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-semibold text-slate-300 shadow-xl backdrop-blur transition hover:border-amber-500/40 hover:text-amber-300"
        title="Toggle component hierarchy (Alt+T)"
      >
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        Hierarchy
      </button>

      {open && (
        <div className="fixed inset-y-0 right-0 z-[9998] flex w-80 flex-col border-l border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Component Hierarchy</p>
              <p className="text-[10px] text-slate-500">Alt+T to toggle · click to expand</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Close hierarchy"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <TreeNode node={COMPONENT_MAP} depth={0} />
            <div className="my-2 border-t border-slate-800" />
            <TreeNode node={COMPONENT_MAP.shared} depth={0} />
          </div>
        </div>
      )}
    </>
  );
};

export default DevTreeOverlay;
