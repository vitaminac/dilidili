import React from "react";
import PropTypes from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import Card from "./card";
import style from "StyleSheets/components/_card";
import classnames from "classnames";

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
    CARD: "card"
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        return {
            sandboxID: props.sandboxID
        };
    },
    endDrag(props, monitor, component) {
        // fix bug when dropped in not dropable context
        if (!monitor.didDrop()) {
            return;
        }
        const target = monitor.getDropResult();
        props.callback(target.sandboxID, props.sandboxID);
    }
};

const cardTarget = {
    drop(props, monitor, component) {
        // Return the data describing the dragged item
        return {
            sandboxID: props.sandboxID
        };
    }
};

function collect(connect, monitor) {
    return ({
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    });
}

function collectTarget(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver()
    };
}

// Use the decorator syntax
@DragSource(Types.CARD, cardSource, collect)
@DropTarget(Types.CARD, cardTarget, collectTarget)
export default class DraggableCard extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.card) !== JSON.stringify(nextProps.card)) {
            console.log(this.props, nextProps);
        }
    }

    render() {
        const {isDragging, connectDragSource, connectDropTarget, isOver, ...passThrough} = this.props;
        // Your component receives its own props as usual
        // These two props are injected by React DnD,
        // as defined by your `collect` function above:
        const classes = classnames(style.cardcontainer, {[style.isdragging]: isDragging || isOver});
        return connectDropTarget(connectDragSource(<div className={classes}><Card {...passThrough}/></div>));
    }
}
