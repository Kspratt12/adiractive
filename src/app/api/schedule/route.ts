import { NextResponse } from "next/server";

const HOST_ID = 62133;
const API_BASE = "https://api.momence.com/host-plugins/host";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "50";

  try {
    const res = await fetch(
      `${API_BASE}/${HOST_ID}/host-schedule/sessions?pageSize=${pageSize}&page=${page}`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 120 }, // Cache for 2 minutes
      }
    );

    if (!res.ok) {
      throw new Error(`Momence API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { payload: [], pagination: { totalCount: 0 } },
      { status: 500 }
    );
  }
}
