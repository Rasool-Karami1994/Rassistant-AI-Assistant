import { cn } from "@react/lib/utils";

function Skeleton({
  className,
  isLoaded = false,
  ...props
}: React.ComponentProps<"div"> & { isLoaded?: boolean }) {
  if (isLoaded) return props.children;
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative animate-pulse rounded-md duration-2000",
        className,
      )}
      {...props}
    >
      <div className="from-hex-2d2d38 to-hex-25252e absolute top-0 right-0 bottom-0 left-0 z-[10] rounded-md bg-linear-to-br" />
      {props.children}
    </div>
  );
}

export { Skeleton };
