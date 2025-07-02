import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@react/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { isFitted?: boolean }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "border-b-custom inline-flex h-12 w-full items-center justify-between",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        [
          "focus-visible:border-ring",
          "focus-visible:ring-ring/50",
          "focus-visible:outline-ring",
          "flex-1",
          "text-[#9D9DB2]",
          "hover:bg-[#232329]",
          "data-[state=active]:[&_hr]:bg-[#00d6c1]",
          "data-[state=active]:bg-[linear-gradient(180deg,rgba(31,77,77,0)_0%,rgba(31,77,77,0.75)_100%)]",
          "flex",
          "h-full",
          "cursor-pointer",
          "flex-col",
          "items-center",
          "justify-center",
          "text-sm",
          "font-normal",
          "whitespace-nowrap",
          "transition-[background,color,box-shadow]",
          "hover:rounded-t-sm",
          "focus-visible:ring-[3px]",
          "focus-visible:outline-1",
          "disabled:pointer-events-none",
          "disabled:opacity-50",
          "data-[state=active]:text-[#EBEBF5]",
        ].join(" "),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <div className="inline-flex flex-1 items-center gap-1.5 transition-[background-color,box-shadow] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        {props.children}
      </div>
      <hr className="m-0 h-[3px] w-full rounded-full border-none bg-transparent transition-[background-color,box-shadow] duration-200" />
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex flex-1 flex-col justify-start py-6 outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
