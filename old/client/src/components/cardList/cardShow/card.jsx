import { Link } from "react-router-dom";
import style from "StyleSheets/components/_card";
import React from "react";
import Image from "./image";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true, style: {display: "none"}};
    }

    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    changeWidth = (imageWidth) => {
        this.setState({style: {display: "block", width: imageWidth}});
    };

    render() {
        return (
            <div className={style.card} style={this.state.style}>
                <Link to={this.props.card.url}>
                    <Image src={this.props.card.logo} callback={this.changeWidth}/>
                    <div className={style.descriptioncontainer}>
                        <h4>{this.props.card.name}</h4>
                        <p>{this.props.card.description}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Card;
