export default function Heading({className, children}){

    let classNameHeading  = [
        className,
        "text-gray-100 text-2xl font-bold py-6"
    ].join(" ");
    return (
        <div className={classNameHeading}>
            {children}
        </div>
    )
}