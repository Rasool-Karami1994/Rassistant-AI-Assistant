import CartPage from "@components/subscription/CartPage";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/subscriptionCart")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const state = location.state as unknown as {
    id: number;
    number_of_chats: number;
    amount: number;
  };
  return <CartPage cartData={state}/>;
}
