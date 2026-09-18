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

export function isEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function explorerUrl(address: string, network: string): string {
  const host = network.toLowerCase() === "mainnet" ? "etherscan.io" : `${network.toLowerCase()}.etherscan.io`;
  return `https://${host}/address/${address}`;
}
