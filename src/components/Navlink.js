import Link from "next/link";

function Navlink({ href, children, className }) {
  let navLinkClassName = [
    className,
    "hover:text-primary-500",
    "whitespace-nowrap uppercase font-semibold tracking-wider",
    "transition duration-150 px-2 py-1",
    "cursor-pointer"
  ].join(' ');
  return (
    <Link href={href} passHref>
      <span className={navLinkClassName}>{children}</span>
    </Link>
  );
}

export default Navlink;
