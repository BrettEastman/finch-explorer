import { NextRequest, NextResponse } from "next/server";
import { getDataClient } from "@/lib/finch";
import { isFinchNotImplemented } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const { individual_ids } = await request.json();

    if (!Array.isArray(individual_ids) || individual_ids.length === 0) {
      return NextResponse.json(
        { error: true, message: "individual_ids array is required", code: "bad_request" },
        { status: 400 }
      );
    }

    const client = getDataClient();
    const response = await client.hris.employments.retrieveMany({
      requests: individual_ids.map((id: string) => ({ individual_id: id })),
    });

    return NextResponse.json({ employments: response.responses });
  } catch (err: unknown) {
    console.error("Employment error:", err);

    if (isFinchNotImplemented(err)) {
      return NextResponse.json(
        {
          error: true,
          message: "This provider does not support the Employment endpoint.",
          code: "not_implemented",
        },
        { status: 501 }
      );
    }

    const message = err instanceof Error ? err.message : "Failed to fetch employment data";
    return NextResponse.json(
      { error: true, message, code: "fetch_failed" },
      { status: 500 }
    );
  }
}
