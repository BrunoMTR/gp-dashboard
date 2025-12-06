// src/components/common/UploadFeedListener.tsx
import React, { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useGlobalAlert } from "../components/common/GlobalAlertProvider";

interface UploadStatus {
  processId: string;
  status: string;
  fileName?: string;
  fileSize?: string;
  uploadedBy?: string;
  reason?: string;
}

const statusVariantMap: Record<string, "default" | "destructive" | "success"> = {
  pending: "default",
  uploading: "default",
  uploaded: "success",
  success: "success",
  failed: "destructive",
  error: "destructive",
};

// 🔥 Função para limitar texto
const truncate = (text: string | undefined, max: number): string => {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) + "..." : text;
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

      // ✂️ Aplica limites (ajusta os números conforme queres)
      const fileName = truncate(msg.fileName, 20);
      const reason = truncate(msg.reason, 30);
      const processId = truncate(msg.processId, 15);

      const message = `${fileName || "Arquivo"} (${processId}) ${
        msg.status.toLowerCase() === "failed" || msg.status.toLowerCase() === "error"
          ? "falhou: " + (reason || "erro desconhecido")
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
