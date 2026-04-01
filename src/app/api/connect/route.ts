import { NextRequest, NextResponse } from "next/server";
import { getSandboxClient, setToken } from "@/lib/finch";
import { SANDBOX_PRODUCTS } from "@/lib/providers";

export async function POST(request: NextRequest) {
  try {
    const { provider_id } = await request.json();

    if (!provider_id) {
      return NextResponse.json(
        { error: true, message: "provider_id is required", code: "bad_request" },
        { status: 400 }
      );
    }

    const client = getSandboxClient();

    const connection = await client.sandbox.connections.create({
      provider_id,
      products: [...SANDBOX_PRODUCTS],
    });

    const accessToken = connection.access_token;
    if (!accessToken) {
      return NextResponse.json(
        { error: true, message: "No access token returned from Finch", code: "no_token" },
        { status: 500 }
      );
    }

    setToken(accessToken, provider_id);

    return NextResponse.json({ success: true, provider_id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to connect";
    console.error("Connect error:", err);
    return NextResponse.json(
      { error: true, message, code: "connect_failed" },
      { status: 500 }
    );
  }
}
