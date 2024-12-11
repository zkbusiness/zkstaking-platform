export const APP_ENV = {
  ENABLE_TESTNETS:               process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true',
  MAINNET_STAKING:               process.env.NEXT_PUBLIC_STAKING_ADDRESS_MAINNET as `0x${string}`,
  SEPOLIA_STAKING:               process.env.NEXT_PUBLIC_STAKING_ADDRESS_SEPOLIA as `0x${string}`,

  MAINNET_TOKEN:                 process.env.NEXT_PUBLIC_CODE_ADDRESS_MAINNET as `0x${string}`,
  SEPOLIA_TOKEN:                 process.env.NEXT_PUBLIC_CODE_ADDRESS_SEPOLIA as `0x${string}`,
  CODE_DECIMAL:                 process.env.NEXT_PUBLIC_CODE_DECIMAL as number | undefined || 18,
  STAKE_FEE:                 process.env.NEXT_PUBLIC_STAKE_FEE as number | undefined || 18,
  ALCHEMY_KEY:               process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  PROJECT_ID:               process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  
};
