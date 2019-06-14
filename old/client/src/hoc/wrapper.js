export default function wrap(wrapper) {
    return (WrappedComponent) => {
        return wrapper(WrappedComponent);
    };
}
