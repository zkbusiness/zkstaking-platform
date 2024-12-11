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
    title: "BUILD ON ZKSYNC",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Quickstart", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Web3 API", href: "#" },
      { label: "SDK", href: "#" },
      { label: "Tools", href: "#" },
    ],
  },
  {
    title: "ZKSYNC NETWORK",
    links: [
      { label: "Status Pages", href: "#" },
      { label: "Bridges", href: "#" },
      { label: "Explorers", href: "#" },
      { label: "Ecosystem", href: "#" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "Discord", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Hey", href: "#" },
      { label: "Mirror", href: "#" },
    ],
  },
  {
    title: "GENERAL",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "API License", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-28 pt-32 pb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-32 md:gap-56 lg:gap-24 xl:gap-56">
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
            src="/images/logo.webp"
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
