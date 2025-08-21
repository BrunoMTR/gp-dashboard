import { Handle, Position } from "@xyflow/react";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface DepartmentNodeProps {
    data: {
        label: string;
    };
}

export const DepartmentNode: React.FC<DepartmentNodeProps> = ({ data }) => {
    return (
        <Card className="w-48 p-2 text-center">
            <CardHeader>
                <CardTitle>{data.label}</CardTitle>
            </CardHeader>

         <Handle
                type="target"
                position={Position.Left}   // agora a conexão entra pelo lado esquerdo
                className="w-4 h-4 bg-teal-500"
            />
            <Handle
                type="source"
                position={Position.Right}  // agora a conexão sai pelo lado direito
                className="w-4 h-4 bg-teal-500"
            />
        </Card>
    );
};
