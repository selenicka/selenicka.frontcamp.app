import React, {Component} from 'react';
import NewsItem from './NewsItem.jsx';

class NewsList extends Component {
    render() {
        const numbers = this.props.numbers;
        const listItems = numbers.map((item, key) =>
            <NewsItem key={key} value={item} />
        );

        return (
            <section>
                <div className="wrapper">{listItems}</div>
            </section>
        );
    }
}

export default NewsList;