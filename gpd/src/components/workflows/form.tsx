import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
interface FormProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export function Form({ open, setOpen }: FormProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="workflow">Workflow</TabsTrigger>
                        <TabsTrigger value="fluxo">Fluxo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="workflow">
                        <Card>
                            <CardHeader>
                                <CardTitle>Workflow</CardTitle>
                                <CardDescription>
                                    Defina os dados do workflow aqui.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Nome</Label>
                                    <Input id="tabs-demo-name" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Abreviatura</Label>
                                    <Input id="tabs-demo-username" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Email</Label>
                                    <Input id="tabs-demo-username"  />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Equipa responsável</Label>
                                    <Input id="tabs-demo-username"  />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Email da equipa</Label>
                                    <Input id="tabs-demo-username"  />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Avançar</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="fluxo">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fluxo</CardTitle>
                                <CardDescription>
                                    Defina o fluxo do workflow aqui.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Current password</Label>
                                    <Input id="tabs-demo-current" type="password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">New password</Label>
                                    <Input id="tabs-demo-new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Registrar workflow</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent >
        </Dialog >

    )
}