import { NextResponse } from "next/server";
import { formatEther, getAddress, isAddress } from "viem";
import { getVerification } from "@/lib/verification";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedAddress = searchParams.get("address");
  const verification = getVerification();
  const targetAddress = verification.contractAddress;
  const contractMatches = requestedAddress ? isAddress(requestedAddress, { strict: false }) && getAddress(requestedAddress) === getAddress(targetAddress) : null;
  const rpcUrl = process.env.ETH_RPC_URL;

  if (!requestedAddress) return NextResponse.json({ status: "success", data: verification, contractMatches: null });
  if (!isAddress(requestedAddress, { strict: false })) return NextResponse.json({ error: "Invalid Ethereum address" }, { status: 400 });
  if (!rpcUrl) return NextResponse.json({ status: "success", data: verification, requestedAddress, contractMatches, onChain: null });

  try {
    const [codeResponse, balanceResponse] = await Promise.all([
      fetch(rpcUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_getCode", params: [getAddress(requestedAddress), "latest"] }), cache: "no-store" }),
      fetch(rpcUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "eth_getBalance", params: [getAddress(requestedAddress), "latest"] }), cache: "no-store" })
    ]);
    const code = (await codeResponse.json()).result;
    const balance = (await balanceResponse.json()).result;
    return NextResponse.json({ status: "success", data: verification, requestedAddress, contractMatches, onChain: { isContract: typeof code === "string" && code !== "0x", balanceEth: typeof balance === "string" ? formatEther(BigInt(balance)) : "unknown" } });
  } catch {
    return NextResponse.json({ error: "The configured RPC provider could not be reached" }, { status: 502 });
  }
}
