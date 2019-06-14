import React from "react";
import DraggableCard from "./draggableCard";
import consts from "abstracts/consts";
import PropTypes from "prop-types";

class CardShow extends React.Component {
    exchange = (id1, id2) => {
        this.props.setState((prevState) => {
            [prevState.data[id1], prevState.data[id2]] = [prevState.data[id2], prevState.data[id1]];
            return {data: prevState.data};
        });
    };

    render() {
        const cacheThis = this;
        return (
            <div className={this.props.className}>
                {
                    (this.props.list && Array.isArray(this.props.list)) && (this.props.list.map(function (card, index) {
                        return (<DraggableCard key={card.url} id={index} callback={cacheThis.exchange} card={card}
                                               openTarget={cacheThis.props.openTarget}/>);
                    }))
                }
            </div>
        );
    }
}

CardShow.propTypes = {
    className: PropTypes.string.isRequired
};

CardShow.defaultProps = {
    className: consts.defaultClassName
};

export default CardShow;
