import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import * as React from "react"
import type { Application } from "../../api/workflows/types"

interface ModalInfoProps {
    open: boolean
    setOpen: (open: boolean) => void
    application: Application | null
}

export function ModalInfo({ open, setOpen, application: workflow}: ModalInfoProps) {
    const [name, setName] = React.useState(workflow?.name || "")
    const [abbreviation, setAbbreviation] = React.useState(workflow?.abbreviation || "")
    const [team, setTeam] = React.useState(workflow?.team || "")
    const [teamEmail, setTeamEmail] = React.useState(workflow?.teamEmail || "")
    const [applicationEmail, setApplicationEmail] = React.useState(workflow?.applicationEmail || "")

    React.useEffect(() => {
        setName(workflow?.name || "")
        setAbbreviation(workflow?.abbreviation || "")
        setTeam(workflow?.team || "")
        setTeamEmail(workflow?.teamEmail || "")
        setApplicationEmail(workflow?.applicationEmail || "")
    }, [workflow])

    const handleClose = () => setOpen(false)

   

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Atualizar Workflow</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para atualizar os dados do workflow.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="abbreviation" className="text-right">Abreviação</Label>
                        <Input id="abbreviation" className="col-span-3" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="applicationEmail" className="text-right">Email</Label>
                        <Input id="applicationEmail" type="email" className="col-span-3" value={applicationEmail} onChange={(e) => setApplicationEmail(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="team" className="text-right">Team</Label>
                        <Input id="team" className="col-span-3" value={team} onChange={(e) => setTeam(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="teamEmail" className="text-right">Team Email</Label>
                        <Input id="teamEmail" type="email" className="col-span-3" value={teamEmail} onChange={(e) => setTeamEmail(e.target.value)} />
                    </div>
                   
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={handleClose}>Cancelar</Button>
                    <Button >Salvar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
