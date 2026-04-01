import { NextResponse } from "next/server";
import { getDataClient } from "@/lib/finch";
import { isFinchNotImplemented } from "@/lib/errors";

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
