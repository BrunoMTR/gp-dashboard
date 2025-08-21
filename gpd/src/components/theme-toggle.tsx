import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react" // ícones bonitinhos

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(theme === "dark")
    }, [theme])

    const handleToggle = (checked: boolean) => {
        setIsDark(checked)
        setTheme(checked ? "dark" : "light")
    }

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="theme-switch" className="cursor-pointer">
                <Sun className="h-4 w-4" />
            </Label>
            <Switch
                id="theme-switch"
                checked={isDark}
                onCheckedChange={handleToggle}
            />
            <Label htmlFor="theme-switch" className="cursor-pointer">
                <Moon className="h-4 w-4" />
            </Label>
        </div>
    )
}
