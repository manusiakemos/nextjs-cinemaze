const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-medium text-sm text-gray-300`}
        {...props}>
        {children}
    </label>
)

export default Label
