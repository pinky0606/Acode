import verification from "@/contract-verification.json";

export type VerificationStatus = "verified" | "pending" | "failed" | string;

export type ContractVerification = typeof verification & {
  contractAddress: string;
  network: string;
  type: string;
  verification: {
    status: VerificationStatus;
    compiler: { version: string; optimization: boolean; runs: number };
    constructorArgs: string[];
  };
};

export function getVerification(): ContractVerification {
  return verification as ContractVerification;
}

export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

export function isEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function explorerUrl(address: string, network: string): string {
  const normalizedNetwork = network.toLowerCase();
  const host = normalizedNetwork === "mainnet" ? "etherscan.io" : `${normalizedNetwork}.etherscan.io`;
  return `https://${host}/address/${address}`;
}
