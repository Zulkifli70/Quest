import { useProductivity } from "../store/ProductivityContext";

const ToastHost = () => {
  const { toast } = useProductivity();
  if (!toast) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="toast" role="status" aria-live="polite">
        {toast.message}
      </div>
    </div>
  );
};

export default ToastHost;
