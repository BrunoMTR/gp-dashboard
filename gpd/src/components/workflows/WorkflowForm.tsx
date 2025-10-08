import { Input } from "@/components/ui/input";
import type { Application } from "@/api/workflows/types";

interface Props {
  value: Application;
  onChange: (value: Application) => void;
}

export function WorkflowForm({ value, onChange }: Props) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Input
        type="text"
        placeholder="Nome"
        maxLength={20}
        className="w-full"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Abreviação"
        maxLength={15}
        className="w-full"
        value={value.abbreviation}
        onChange={(e) => onChange({ ...value, abbreviation: e.target.value })}
      />

      <Input
        type="email"
        placeholder="Application Email"
        className="w-full"
        value={value.applicationEmail}
        onChange={(e) => onChange({ ...value, applicationEmail: e.target.value })}
      />

      <Input
        type="text"
        placeholder="Team"
        className="w-full"
        value={value.team}
        onChange={(e) => onChange({ ...value, team: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Team Email"
        className="w-full"
        value={value.teamEmail}
        onChange={(e) => onChange({ ...value, teamEmail: e.target.value })}
      />
    </div>
  );
}
