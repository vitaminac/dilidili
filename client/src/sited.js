import React from "react";
import Body from "./layout/container/body";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import MainLayout from "./layout/main";
import style from "StyleSheets";

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
    render() {
        return (
            <Body className={style.sited}>
            <MainLayout />
            </Body>
        );
    }
}
