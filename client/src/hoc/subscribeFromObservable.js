import { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

// This function takes a component...
function subscribeFromObservable(observable, propertyNmae = "data", transform = (source) => source, whenDataChange = (prevData, data) => (data), setStateCallback) {
    return (WrappedComponent) => {
        // ...and returns another component...
        class WithSubscription extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: []
                };
            }

            componentDidMount() {
                this.subscribe(observable);
            }

            componentWillUnmount() {
                // Clean up listener
                this.unsubscribe();
            }

            subscribe = (observable) => {
                // "observable" is some rx observable
                this.source = transform(observable);
                // ... that takes care of the subscription...
                // Subscribe to changes
                this.subscription = this.source.subscribe(this.changeData);
            };
            unsubscribe = () => {
                this.subscription.unsubscribe();
            };
            changeData = (data) => {
                // Update component state whenever the data source changes
                this.setState(
                    (prevState, props) => {
                        return {data: whenDataChange(prevState.data, data)};
                    },
                    setStateCallback);
            };

            render() {
                // Filter out extra props that are specific to this HOC and shouldn't be passed through
                const {observable, ...passThroughProps} = this.props;

                // Inject props into the wrapped component. These are usually state values or instance methods.
                passThroughProps[propertyNmae] = this.state.data;
                passThroughProps.setState = this.setState.bind(this);
                // ... and renders the wrapped component with the fresh data!
                // Notice that we pass through any additional props
                return <WrappedComponent {...passThroughProps} />;
            }
        }
        WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
        hoistNonReactStatic(WithSubscription, WrappedComponent);
        return WithSubscription;
    };
}

export default subscribeFromObservable;
