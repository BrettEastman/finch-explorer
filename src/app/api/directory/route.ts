import { NextResponse } from "next/server";
import { getDataClient } from "@/lib/finch";
import { isFinchNotImplemented } from "@/lib/errors";

export async function GET() {
  try {
    const client = getDataClient();
    const directory = await client.hris.directory.list();
    const individuals = [];
    for await (const person of directory) {
      individuals.push(person);
    }
    return NextResponse.json({ individuals });
  } catch (err: unknown) {
    console.error("Directory error:", err);

    if (isFinchNotImplemented(err)) {
      return NextResponse.json(
        {
          error: true,
          message: "This provider does not support the Directory endpoint.",
          code: "not_implemented",
        },
        { status: 501 }
      );
    }

    const message = err instanceof Error ? err.message : "Failed to fetch directory";
    return NextResponse.json(
      { error: true, message, code: "fetch_failed" },
      { status: 500 }
    );
  }
}
