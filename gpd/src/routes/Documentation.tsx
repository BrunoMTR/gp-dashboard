import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Shadcn Card
import { Button } from '@/components/ui/button'; // Shadcn Button
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Shadcn Dialog para modais
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Shadcn Select

// Dados iniciais (mesmo do dummyFileSystem)
const initialFiles = [
  { id: '0', name: 'Raiz', path: '/', isDir: true },
  { id: '31258', name: 'report.pdf', path: '/report.pdf', isDir: false, size: 1024000 },
  { id: '31259', name: 'Documents', path: '/Documents', isDir: true },
  { id: '31261', name: 'Personal', path: '/Documents/Personal', isDir: true },
  { id: '31262', name: 'report.docx', path: '/report.docx', isDir: false, size: 2048000 },
  { id: '31267', name: 'Images', path: '/Images', isDir: true },
  { id: '31268', name: 'logo.png', path: '/Images/logo.png', isDir: false, size: 512000 },
];

export const Route = createFileRoute('/Documentation')({
  component: Documentation,
});

function Documentation() {
  const [files, setFiles] = useState(initialFiles);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Apagar?')) {
      setFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleAdd = (name: string, isDir: boolean) => {
    const newItem = { id: `new-${Date.now()}`, name, path: `/${name}`, isDir, size: isDir ? undefined : 0 };
    setFiles(prev => [...prev, newItem]);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-gray-100 border-b">
        <Button onClick={() => {/* Lógica para adicionar */}}>Adicionar</Button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {files.map((item) => (
            <Card key={item.id} className="w-full h-48 cursor-pointer hover:shadow-md">
              <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-lg">{item.isDir ? '📁' : '📄'} {item.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {item.size && <p className="text-sm text-gray-600">{(item.size / 1024).toFixed(0)} KB</p>}
                <div className="flex justify-center space-x-2 mt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>Detalhes</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalhes: {selectedItem?.name}</DialogTitle>
                        <p>Tipo: {selectedItem?.isDir ? 'Pasta' : 'Arquivo'}</p>
                        {selectedItem?.size && <p>Tamanho: {(selectedItem.size / 1024).toFixed(2)} KB</p>}
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Apagar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Modal Adicionar (use Dialog similar) */}
    </div>
  );
}