import Link from "next/link";

const KitButton = ({
  variant,
  className="bg-primary-500 hover:bg-primary-600",
  disabled = false,
  onClick = null,
  href= null,
  children,
}) => {
  let buttonClass;
  //   link button
  if (variant == "link") {
    buttonClass = [
        className,
        "text-white uppercase font-semibold tracking-wider cursor-pointer",
        "px-4 py-2",
        "transform transition duration-150 ease-in-out hover:scale-105",
    ].join(" ");
    return (
      <Link href={href} disabled={disabled} onClick={onClick} passHref>
        <div className={buttonClass}>{children}</div>
      </Link>
    );
  }else if(variant=='circle'){
    buttonClass = [
        className,
        "text-white uppercase font-semibold tracking-wider",
        "p-3 h-12 w-12 rounded-full",
        "transform transition duration-150 ease-in-out hover:scale-105",
    ].join(" ");
    return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>{children}</button>
    );
  }else if(variant=='rounded'){
    buttonClass = [
        className,
        "text-white uppercase font-semibold tracking-wider",
        "py-2 px-4",
        "transform transition duration-150 ease-in-out hover:scale-105",
    ].join(" ");
    return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>{children}</button>
    );
  }
};

export default KitButton;
