import React from 'react';
import SearchContent from '../component/SearchContent';

export default class SearchPage extends React.Component {
    titleCallback(content) {
        document.title = "BH5 | 搜索:" + content;
    }

    render() {
        return (
            <SearchContent cb={this.titleCallback} keyword={this.props.match.params.keyword} />
        );
    }
}