import { notFound } from "next/navigation";
import { decades, type DecadeId } from "@/lib/decades";

/**
 * Scopes everything under /decade/[id] into that decade's visual world
 * (master brief §37: "master interface stays consistent, the decade
 * changes the atmosphere"). One [data-decade] attribute on this wrapper
 * is the entire re-skinning mechanism — see globals.css.
 *
 * generateStaticParams enumerates all seven decades so these routes
 * prerender at build time; an unknown id (mistyped URL, old link) 404s
 * rather than silently rendering with no theme.
 */

export function generateStaticParams() {
  return decades.map((decade) => ({ id: decade.id }));
}

function isDecadeId(value: string): value is DecadeId {
  return decades.some((d) => d.id === value);
}

export default async function DecadeLayout({
  params,
  children,
}: LayoutProps<"/decade/[id]">) {
  const { id } = await params;
  if (!isDecadeId(id)) notFound();

  return (
    <div
      data-decade={id}
      className="flex-1 flex flex-col bg-decade-deep text-decade-on-deep decade-enter"
    >
      {children}
    </div>
  );
}
