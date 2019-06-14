import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { connect } from "react-redux";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

// This function takes a component...
function subscribe(selector = (state) => state, transform = (source) => source, whenDataChange, whenSourceChange, setStateCallback, propertyNmae = "data", mapDispatchToProps) {
    return (WrappedComponent) => {
        const mapStateToProps = state => {
            return {
                observable: selector(state)
            };
        };
        // ...and returns another component...
        class WithSubscription extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: []
                };
            }

            componentWillReceiveProps(nextProps) {
                if (nextProps.observable !== this.props.observable) {
                    if (whenSourceChange) {
                        this.setState(
                            (prevState, props) => {
                                return {data: whenSourceChange(prevState.data, nextProps.observable)};
                            },
                            setStateCallback);
                    }
                    this.unsubscribe();
                    // Update component state whenever the data source changes
                    this.subscribe(nextProps.observable);
                }
            }

            componentDidMount() {
                this.subscribe(this.props.observable);
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
                const {data} = this.state;
                // Inject props into the wrapped component. These are usually state values or instance methods.
                passThroughProps[propertyNmae] = data;
                passThroughProps.setState = this.setState.bind(this);
                // ... and renders the wrapped component with the fresh data!
                // Notice that we pass through any additional props
                return <WrappedComponent {...passThroughProps} />;
            }
        }
        WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
        hoistNonReactStatic(WithSubscription, WrappedComponent);
        return connect(mapStateToProps, mapDispatchToProps)(WithSubscription);
    };
}

export default subscribe;
