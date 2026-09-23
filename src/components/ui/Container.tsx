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
      ? "max-w-[72rem]"
      : width === "prose"
        ? "max-w-[46rem]"
        : "max-w-[64rem]";

  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
