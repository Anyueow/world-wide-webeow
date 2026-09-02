import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "prose";
}) {
  const max =
    width === "wide"
      ? "max-w-[104rem]"
      : width === "prose"
        ? "max-w-[46rem]"
        : "max-w-[78rem]";

  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
