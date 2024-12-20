import { APP_ENV } from './env.config';

export const ZK_TOKEN_ADDRESS: { [key: number]: `0x${string}` } = {
  324: APP_ENV.MAINNET_TOKEN,
  300: APP_ENV.SEPOLIA_TOKEN,
};

export const STAKING_CONTRACT: { [key: number]: `0x${string}` } = {
  324: APP_ENV.MAINNET_STAKING,
  300: APP_ENV.SEPOLIA_STAKING,
};

export const getZKTokenAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return ZK_TOKEN_ADDRESS[chainId];
};

export const getStakingContractAddress = (chainId: number | undefined): `0x${string}` => {
  if (!chainId) {
    return '0x0';
  }

  return STAKING_CONTRACT[chainId];
};
