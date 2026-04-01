import { NextResponse } from "next/server";
import { getDataClient } from "@/lib/finch";

export async function GET() {
  try {
    const client = getDataClient();
    const company = await client.hris.company.retrieve();
    return NextResponse.json(company);
  } catch (err: unknown) {
    console.error("Company error:", err);

    if (isFinchNotImplemented(err)) {
      return NextResponse.json(
        {
          error: true,
          message: "This provider does not support the Company endpoint.",
          code: "not_implemented",
        },
        { status: 501 }
      );
    }

    const message = err instanceof Error ? err.message : "Failed to fetch company data";
    return NextResponse.json(
      { error: true, message, code: "fetch_failed" },
      { status: 500 }
    );
  }
}

function isFinchNotImplemented(err: unknown): boolean {
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.status === 501) return true;
    if (typeof e.message === "string" && e.message.toLowerCase().includes("not implemented"))
      return true;
  }
  return false;
}
