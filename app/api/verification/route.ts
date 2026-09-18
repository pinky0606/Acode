import { NextResponse } from "next/server";
import { getVerification } from "@/lib/verification";

export async function GET() {
  return NextResponse.json({ data: getVerification() });
}
