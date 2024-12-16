import Link from "next/link";
import Image from "next/image";

interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Offcial links",
    links: [
      { label: "GitHub", href: "https://github.com/zkbusiness/" },
      { label: "Smart Contract", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Audit Whitepaper", href: "#" },
      { label: "Medium", href: "#" },
      { label: "Reddit", href: "#" },
    ],
  },
  {
    title: "Bridges & DEXs",
    links: [
      { label: "zkswap.finance", href: "https://www.zkswap.finance/bridge" },
      { label: "zksync.io", href: "https://portal.zksync.io/bridge" },
      { label: "Symbiosis", href: "https://app.symbiosis.finance/swap?_gl=1%2Aa44kca%2A_ga%2AMTEyODM4MDAxMC4xNzM0MzU0ODE4%2A_ga_YKCPZTG9X6%2AMTczNDM1NDgxOC4xLjAuMTczNDM1NDgxOC42MC4wLjA.&amountIn&chainIn=Ethereum&chainOut=ZkSync%20Era&tokenIn=ETH&tokenOut=ETH" },
      { label: "Jumper Exchange", href: "https://jumper.exchange/?fromChain=1&fromToken=0x0000000000000000000000000000000000000000&toChain=324&toToken=0x0000000000000000000000000000000000000000" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "Discord", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Hey", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        zIndex: "10000",
      }}
      className=" text-white px-6 md:px-28 pt-16 pb-10  relative"
    >
      <div className=" top-0 h-full w-screen bg-black absolute left-1/2  -translate-x-1/2 -z-30"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-32 md:gap-56 lg:gap-24 xl:gap-56">
        {footerColumns.map((column) => (
          <div key={column.title} className="space-y-4">
            <h3 className="text-[#4075FF] font-semibold text-basic tracking-wider">
              {column.title}
            </h3>
            <br />
            <ul className="space-y-4">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="text-gray-300  text-nowrap hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-32">
        <Link href="/" className="inline-block">
          <Image
            draggable="false"
            src="/images/logo.png"
            alt=""
            width={500}
            height={500}
            className="w-[220px] h-auto"
          />
        </Link>
      </div>
    </footer>
  );
}
