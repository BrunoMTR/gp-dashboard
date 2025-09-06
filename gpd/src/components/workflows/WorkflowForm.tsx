import { Input } from "@/components/ui/input";
import type { WorkflowApplication} from "@/api/workflows/types";

interface Props {
  value: WorkflowApplication;
  onChange: (value: WorkflowApplication) => void;
}

export function WorkflowForm({ value, onChange }: Props) {
  return (
    <>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Nome"
          maxLength={50}
          className="flex-1"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Abreviação"
          maxLength={15}
          className="w-28"
          value={value.abbreviation}
          onChange={(e) => onChange({ ...value, abbreviation: e.target.value })}
        />
      </div>

      <Input
        type="email"
        placeholder="Application Email"
        className="w-full"
        value={value.applicationEmail}
        onChange={(e) => onChange({ ...value, applicationEmail: e.target.value })}
      />

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Team"
          className="flex-1"
          value={value.team}
          onChange={(e) => onChange({ ...value, team: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Team Email"
          className="flex-1"
          value={value.teamEmail}
          onChange={(e) => onChange({ ...value, teamEmail: e.target.value })}
        />
      </div>
    </>
  );
}
