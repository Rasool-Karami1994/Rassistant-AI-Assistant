import { InstructionFormComponent } from "@components/advertisement/InstructionFormComponent";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/$advertismentInstructionEditForm")({
  component: RouteComponent,
});
function RouteComponent() {
  const location = useLocation();

  const state = location.state as unknown as {
    question: string;
    assistantAnswer: string;
    post: string;
    id: number;
  };

  return (
    <InstructionFormComponent
      question={state?.question || ""}
      assistantAnswer={state?.assistantAnswer || ""}
      post={state?.post || ""}
      id={state?.id}
    />
  );
}
