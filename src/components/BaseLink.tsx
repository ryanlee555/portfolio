"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { BASES, requestBase } from "@/lib/bases";

// A normal link to a base's page, except a plain click lets the penguin run there first.
export default function BaseLink({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    requestBase(index);
  };

  return (
    <Link href={BASES[index].path} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
