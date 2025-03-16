import { cn } from "@/lib/utils";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobile = "mobile:max-w-[320px] ";
  const sm = "sm:max-w-[640px]";
  const md = "md:max-w-[768px]";
  const lg = "lg:max-w-[1024px] lg:px-0";
  const xl = "xl:max-w-[1200px]";
  const xxl = "2xl:max-w-[1740px]";
  return (
    <div className={cn("mx-auto", "my-0", "px-4", mobile, sm, md, lg, xl, xxl)}>
      {children}
    </div>
  );
}
