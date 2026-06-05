import type { ReactElement } from "react";
import { FaWix, FaWordpress, FaShopify } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { IoLogoFigma, IoLogoFirebase, IoLogoAndroid } from "react-icons/io5";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { SiZoho, SiGsap, SiReact, SiLaravel, SiTypescript, SiNodedotjs, SiTailwindcss, SiPhp } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

export type MarqueeItem = {
  label: string;
  icon: ReactElement;
};

export const techMarqueeRowOne: MarqueeItem[] = [
  { label: "Flutter", icon: <FaFlutter className="text-[#54C5F8]" /> },
  { label: "React", icon: <SiReact className="text-[#61DAFB]" /> },
  { label: "Next.js", icon: <RiNextjsFill className="text-foreground" /> },
  { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  { label: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { label: "GSAP", icon: <SiGsap className="text-[#88CE02]" /> },
  { label: "Figma", icon: <IoLogoFigma className="text-[#F24E1E]" /> },
  { label: "Android", icon: <IoLogoAndroid className="text-[#3DDC84]" /> },
];

export const techMarqueeRowTwo: MarqueeItem[] = [
  { label: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
  { label: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
  { label: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
  { label: "Firebase", icon: <IoLogoFirebase className="text-[#FFCA28]" /> },
  { label: "Google Cloud", icon: <BiLogoGoogleCloud className="text-[#4285F4]" /> },
  { label: "Shopify", icon: <FaShopify className="text-[#96BF48]" /> },
  { label: "WordPress", icon: <FaWordpress className="text-[#21759B]" /> },
  { label: "Wix", icon: <FaWix className="text-[#0C6EBD]" /> },
  { label: "Zoho", icon: <SiZoho className="text-[#E42527]" /> },
];

export const techMarqueeItems: MarqueeItem[] = [
  ...techMarqueeRowOne,
  ...techMarqueeRowTwo,
];
