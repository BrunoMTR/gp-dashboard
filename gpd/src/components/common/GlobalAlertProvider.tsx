// src/components/common/GlobalAlertProvider.tsx
import React, { createContext, useContext, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GlobalAlert {
  id: string;
  message: string;
  variant?: "default" | "destructive" | "success";
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

    setAlerts(prev => {
      const next = [...prev, { ...alert, id }];
      return next.slice(-10); // 🔥 limite máximo de 10 alerts visíveis
    });

    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 5000);
  };

  return (
    <GlobalAlertContext.Provider value={{ addAlert }}>
      {children}

      {/* Container fixo com limite de altura e scroll */}
      <div className="fixed top-4 right-4 z-50 flex flex-col max-h-[60vh] w-96 overflow-y-auto gap-2 pr-1 pointer-events-none">

        <AnimatePresence initial={false}>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto"
            >
              <Alert
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
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </GlobalAlertContext.Provider>
  );
};
