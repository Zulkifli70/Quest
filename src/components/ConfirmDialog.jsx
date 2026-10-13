import { useEffect } from "react";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Ya, selesaikan",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="help-backdrop"
      style={{ display: "grid", placeItems: "center", padding: 16 }}
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="panel w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="confirm-title" className="pixel text-[10px]" style={{ color: "var(--gold)" }}>
          {title}
        </p>
        <p className="mt-3 text-[15px]" style={{ color: "var(--text)" }}>
          {message}
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button className="btn" onClick={onCancel} autoFocus>
            <span className="pixel text-[8px]">{cancelLabel}</span>
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            <span className="pixel text-[8px]">{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
