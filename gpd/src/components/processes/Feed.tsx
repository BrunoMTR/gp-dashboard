import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface UploadStatus {
  processId: string;
  status: string;
  fileName?: string;
  fileSize?: string;
  uploadedBy?: string;
  reason?: string;
}

export function Feed() {
  const [messages, setMessages] = useState<UploadStatus[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5157/hubs/documentation") // URL da tua API
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("Conectado ao SignalR!"))
      .catch(err => console.error("Erro ao conectar:", err));

    // Receber mensagens do backend
    connection.on("ReceiveUploadStatus", (msg: UploadStatus) => {
      console.log("Mensagem recebida:", msg);
      setMessages(prev => [msg, ...prev]); // adiciona no topo
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>Feed de Uploads</h2>
      {messages.length === 0 && <p>Nenhum upload ainda.</p>}
      <ul>
        {messages.map((m, idx) => (
          <li key={idx}>
            <strong>Processo:</strong> {m.processId || "-"} —
            <strong>Status:</strong> {m.status || "-"}
            {m.fileName && <> — <strong>Arquivo:</strong> {m.fileName}</>}
            {m.fileSize && <> — <strong>Tamanho:</strong> {m.fileSize}</>}
            {m.uploadedBy && <> — <strong>Por:</strong> {m.uploadedBy}</>}
            {m.reason && <> — <strong>Motivo:</strong> {m.reason}</>}
          </li>
        ))}
      </ul>

    </div>
  );
}
