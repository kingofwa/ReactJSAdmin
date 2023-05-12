import Image from "next/image";
import Link from "next/link";

const SiteLogo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          src="/f-logo.png"
          layout="responsive"
          width="240"
          height="54"
          alt="エンコネ"
        />
      </a>
    </Link>
  );
};

export default SiteLogo;
