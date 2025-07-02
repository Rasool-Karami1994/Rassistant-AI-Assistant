import { InstructionFormComponent } from "@components/advertisement/InstructionFormComponent";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/newAdvertisementInstructionForm")({
  component: RouteComponent,
});
function RouteComponent() {
  const location = useLocation();

  const state = location.state as unknown as {
    id: string;
  };
  return <InstructionFormComponent post={state?.id} />;
}
