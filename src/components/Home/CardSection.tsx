import { ReactNode } from "react";
import Button from "@components/ui/Button";

interface CardProp {
  title: string;
  content: string;
  ButtonSection: ReactNode;
}

const Card = ({ title, content, ButtonSection }: CardProp) => {
  return (
    <div className="bg-background p-10 md:p-16  rounded-[40px] flex flex-col gap-5 w-full lg:w-1/2 ">
      <div className="font-semibold text-4xl">{title}</div>
      <div className="text-xl mb-14">{content}</div>
      {ButtonSection}
    </div>
  );
};

const CardSection = () => {
  return (
    <section className="xl:px-28 px-6 lg:px-12 flex flex-col lg:flex-row gap-4 mt-10 mb-10 ">
      <Card
        title="Build an App"
        content="Deploy your project on ZKsync Era, the first ZK chain, in a familiar developer experience."
        ButtonSection={
          <Button type="primary" rounded size="lg">
            Create an App in minutes
          </Button>
        }
      />
      <Card
        title="Build your own ZK chain"
        content="Your rules, your sequencing, your token. Tap into network effects of shared users, liquidity and more."
        ButtonSection={
          <Button type="primary" size="lg" rounded>
            Deploy a ZK Chain
          </Button>
        }
      />
    </section>
  );
};

export default CardSection;
