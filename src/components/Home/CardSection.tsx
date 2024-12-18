import { ReactNode } from "react";
import Button from "@components/ui/Button";
import Link from "next/link";

interface CardProp {
  title: string;
  content: string;
  ButtonSection: ReactNode;
}

const Card = ({ title, content, ButtonSection }: CardProp) => {
  return (
    <div className="bg-background p-6  xs:p-10 md:p-16  rounded-2xl xs:rounded-[40px] flex flex-col xs:gap-5 gap-3 w-full lg:w-1/2 ">
      <div className="font-semibold  text-3xl xs:text-4xl">{title}</div>
      <div className="text-xl mb-14">{content}</div>
      {ButtonSection}
    </div>
  );
};

const CardSection = () => {
  return (
    <section className="xl:px-28 px-6 lg:px-12 flex flex-col lg:flex-row gap-4 mt-10 mb-10 ">
      <Card
        title="Need ETH on Zksync"
        content="How to get ETH on Zksync chain. Official Bridge site for ZK ETH"
        ButtonSection={
          <Button type="primary" rounded size="lg">
            <Link
              href={"https://www.zkswap.finance/bridge?chain=eth"}
              target="_blank"
            >
              Official Bridge Site
            </Link>
          </Button>
        }
      />
      <Card
        title="Need ZK on Zksync"
        content="How to get ZK token on Zksync chain. Official DEX site for ZK token"
        ButtonSection={
          <Button type="primary" size="lg" rounded>
            <Link
              href={
                "https://www.zkswap.finance/swap?outputCurrency=0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E"
              }
              target="_blank"
            >
              Official DEX Site
            </Link>
          </Button>
        }
      />
    </section>
  );
};

export default CardSection;
