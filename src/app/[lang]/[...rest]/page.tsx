import { notFound } from "next/navigation";

/** Any unknown path under a locale renders that locale's branded 404. */
export default function CatchAll() {
  notFound();
}
