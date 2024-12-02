import { UserNav } from "./UserNav";
import { MobileNav } from "./MobileNav";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-4">
          <div className="flex-1" />
          <UserNav />
        </div>
      </div>
    </header>
  );
}