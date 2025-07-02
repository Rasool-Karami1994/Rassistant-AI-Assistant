import { Instruction } from "@react/pages/instruction";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/instructions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Instruction />;
}
