import { useState } from "react";
import FaqCard from "./FaqCard";

const FaqSection = () => {
  const faqs = [
    {
      icon: "/images/zk.png",
      title: "How Can I Stake My Tokens?",
      description:
        "Staking is a way to lock your tokens into a staking platform or smart contract to earn rewards, typically in the form of additional tokens.",
      content: `
      1. Connect Your Wallet:  
         Visit the staking platform and connect your crypto wallet (e.g., MetaMask, WalletConnect). Ensure you have the required tokens and enough gas fees for the transaction.  

      2. Select a Staking Pool:  
         Choose a staking pool or program that aligns with your goals. Some pools offer higher rewards but may require a longer lock-in period.  

      3. Approve the Token Contract:  
         Click on the "Approve" button to allow the staking contract to access your tokens. This step is necessary for secure interaction with the smart contract.  

      4. Stake Your Tokens:  
         After approval, enter the amount of tokens you wish to stake and confirm the staking transaction in your wallet.  

      5. Earn Rewards:  
         Once staked, your tokens will start earning rewards according to the pool's reward structure.  

      6. Withdraw or Claim Rewards:  
         You can withdraw your staked tokens or claim rewards at any time (if supported by the pool). Make sure to check the lock-in period and any penalties for early withdrawal.  

      If you have further questions or encounter issues, feel free to reach out to our support team!
      `,
    },
    {
      icon: "/images/zk.png",
      title: "How Can I Stake My Tokens?",
      description:
        "Staking is a way to lock your tokens into a staking platform or smart contract to earn rewards, typically in the form of additional tokens.",
      content: `1. Connect Your Wallet:  
         Visit the staking platform and connect your crypto wallet (e.g., MetaMask, WalletConnect). Ensure you have the required tokens and enough gas fees for the transaction.  

      2. Select a Staking Pool:  
         Choose a staking pool or program that aligns with your goals. Some pools offer higher rewards but may require a longer lock-in period.  

      3. Approve the Token Contract:  
         Click on the "Approve" button to allow the staking contract to access your tokens. This step is necessary for secure interaction with the smart contract.  

      4. Stake Your Tokens:  
         After approval, enter the amount of tokens you wish to stake and confirm the staking transaction in your wallet.  

      5. Earn Rewards:  
         Once staked, your tokens will start earning rewards according to the pool's reward structure.  

      6. Withdraw or Claim Rewards:  
         You can withdraw your staked tokens or claim rewards at any time (if supported by the pool). Make sure to check the lock-in period and any penalties for early withdrawal.  

      If you have further questions or encounter issues, feel free to reach out to our support team!
      `,
    },
  ];

  const [current, setCurrent] = useState<number>(-1);

  return (
    <div className="xl:px-28 px-6 lg:px-12 flex flex-col  gap-4 mt-20 mb-10 ">
      {faqs.map((val, index) => (
        <FaqCard
          title={val.title}
          key={index}
          icon={val.icon}
          description={val.description}
          isExpended={index === current}
          onToggle={() => {
            if (index === current) setCurrent(-1);
            else setCurrent(index);
          }}
        >
          {val.content}
        </FaqCard>
      ))}
    </div>
  );
};

export default FaqSection;
