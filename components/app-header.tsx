import { GraduationCap } from "lucide-react"

export function AppHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <span className="text-lg font-extrabold tracking-tight">99</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold text-foreground">99 Group Quiz Builder</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <GraduationCap className="size-3.5" />
            Employee Learning &amp; Development
          </span>
        </div>
      </div>
    </header>
  )
}
