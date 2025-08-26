import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUnit } from "@/api/units/mutations";
import type { Unit } from "../../api/units/types";
import type { UseMutationResult } from "@tanstack/react-query";

interface CriarUnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCriar: (novo: Unit) => void;
}

export function CriarUnitDialog({ open, onOpenChange, onCriar }: CriarUnitDialogProps) {
    
  const [unit, setUnit] = React.useState<Unit>({
    name: "",
    abbreviation: "",
    email: "",
  });

  const createUnitMutation: UseMutationResult<Unit, Error, Unit> = useCreateUnit();

  const handleCriar = () => {
    createUnitMutation.mutate(unit, {
      onSuccess: (newUnit) => {
        onCriar(newUnit);   
        setUnit({ name: "", abbreviation: "", email: "" }); 
        onOpenChange(false);        
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo Unit</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div>
            <Label htmlFor="name" className="mb-2">Nome</Label>
            <Input
              id="name"
              value={unit.name}
              onChange={(e) => setUnit({ ...unit, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="abbreviation" className="mb-2">Abreviação</Label>
            <Input
              id="abbreviation"
              value={unit.abbreviation}
              onChange={(e) => setUnit({ ...unit, abbreviation: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">Email</Label>
            <Input
              id="email"
              type="email"
              value={unit.email}
              onChange={(e) => setUnit({ ...unit, email: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleCriar}
            disabled={createUnitMutation.isPending} 
          >
            {createUnitMutation.isPending ? "Criando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
