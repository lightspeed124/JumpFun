import { NextRequest, NextResponse } from "next/server";
import { getListingsByIds } from "@/lib/data";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("ids") ?? "";
  const ids = raw
    .split(",")
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  const items = await getListingsByIds(ids);
  return NextResponse.json(items);
}
