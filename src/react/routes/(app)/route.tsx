import BottomNavbar from "@components/BottomNavbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="mx-auto flex min-h-screen flex-col bg-[var(--primary-bg)]"
      dir="rtl"
    >
      <header className="flex w-full items-center justify-start gap-3 py-[19px] pr-4 text-lg font-medium text-[var(--primary-color)]">
        <img
          src="/images/rassistant-logo.svg"
          alt="rassistant-logo"
          className="h-[30px] w-[30px] rounded-2xl"
        />
        <p>دستیار</p>
      </header>
      <Outlet />
      <footer className="bg-secondary-bg p-4 text-center">
        <BottomNavbar />
      </footer>
    </div>
  );
}

export default RouteComponent;
