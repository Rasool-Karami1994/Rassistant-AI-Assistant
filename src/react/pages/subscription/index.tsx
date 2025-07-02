import PaymentRecords from "@components/subscription/tabs/PaymentRecords";
import SubscriptionTab from "@components/subscription/tabs/SubscriptionTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";
export const Subscription = () => {
  return (
    <div className="w-full min-w-[360px] flex-1">
      <div className="flex w-full flex-row gap-6">
        <Tabs defaultValue="commands">
          <TabsList>
            <TabsTrigger value="commands">اشتراک</TabsTrigger>
            <TabsTrigger value="settings">سوابق پرداخت</TabsTrigger>
          </TabsList>
          <TabsContent value="commands">
            <SubscriptionTab />
          </TabsContent>
          <TabsContent value="settings">
            <PaymentRecords />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
