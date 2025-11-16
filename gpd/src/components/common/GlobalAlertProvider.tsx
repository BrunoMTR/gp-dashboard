// src/components/common/GlobalAlertProvider.tsx
import React, { createContext, useContext, useState } from "react";
import { Alert } from "@/components/ui/alert"; 
import { X } from "lucide-react";

interface GlobalAlert {
  id: string;
  message: string;
  variant?: "default" | "destructive" | "success"; // compatível com shadcn
}

interface GlobalAlertContextValue {
  addAlert: (alert: Omit<GlobalAlert, "id">) => void;
}

const GlobalAlertContext = createContext<GlobalAlertContextValue | undefined>(undefined);

export const useGlobalAlert = () => {
  const context = useContext(GlobalAlertContext);
  if (!context) throw new Error("useGlobalAlert must be used within GlobalAlertProvider");
  return context;
};

export const GlobalAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<GlobalAlert[]>([]);

  const addAlert = (alert: Omit<GlobalAlert, "id">) => {
    const id = crypto.randomUUID();
    setAlerts(prev => [...prev, { ...alert, id }]);
    // opcional: remover automaticamente após X segundos
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 5000);
  };

  return (
    <GlobalAlertContext.Provider value={{ addAlert }}>
      {children}
      {/* Overlay de alerts global */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={
              alert.variant === "success"
                ? "default"
                : alert.variant === "destructive"
                ? "destructive"
                : "default"
            }
            className="flex justify-between items-center"
          >
            <span>{alert.message}</span>
            <button
              onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
              className="ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        ))}
      </div>
    </GlobalAlertContext.Provider>
  );
};
