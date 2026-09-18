import { NextResponse } from "next/server";
import { getVerification, normalizeAddress } from "@/lib/verification";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const verification = getVerification();

  const normalizedTarget = normalizeAddress(verification.contractAddress);
  const isMatch = address ? normalizeAddress(address) === normalizedTarget : null;

  return NextResponse.json({
    status: "success",
    data: verification,
    requestedAddress: address,
    contractMatches: isMatch,
    targetAddress: verification.contractAddress,
  });
}
