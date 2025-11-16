// src/components/common/UploadFeedListener.tsx
import React, { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useGlobalAlert } from "../components/common/GlobalAlertProvider";

interface UploadStatus {
  processId: string;
  status: string; // Pending, Uploading, Uploaded, Failed, etc.
  fileName?: string;
  fileSize?: string;
  uploadedBy?: string;
  reason?: string;
}

// Mapeia status para o variant válido do GlobalAlert
const statusVariantMap: Record<string, "default" | "destructive" | "success"> = {
  pending: "default",
  uploading: "default",
  uploaded: "success",
  success: "success",
  failed: "destructive",
  error: "destructive",
};

export const DocAlert: React.FC = () => {
  const { addAlert } = useGlobalAlert();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5157/hubs/documentation")
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("Conectado ao SignalR!"))
      .catch(err => console.error("Erro ao conectar:", err));

    connection.on("ReceiveUploadStatus", (msg: UploadStatus) => {
      const variant = statusVariantMap[msg.status.toLowerCase()] ?? "default";

      const message = `${msg.fileName || "Arquivo"} (${msg.processId}) ${
        msg.status.toLowerCase() === "failed" || msg.status.toLowerCase() === "error"
          ? "falhou: " + (msg.reason || "erro desconhecido")
          : msg.status
      }`;

      addAlert({
        message,
        variant,
      });
    });

    return () => {
      connection.stop().catch(err => console.error("Erro ao parar conexão:", err));
    };
  }, [addAlert]);

  return null;
};
