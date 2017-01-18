import React, {Component} from 'react';

class AddArticle extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        let urlAPI = 'http://localhost:3000/article/save',
            request = new Request(urlAPI),
            myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        let requestInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify(this.state)
        };

        fetch(request, requestInit)
         .then(r => r.json())
         .then(function (data) {
            console.log('Request succeeded with JSON response', data);
         })
         .catch(function (error) {
            console.log('Request failed', error);
         });
    }

    handleChange(field, e) {
        var nextState = this.state;

        nextState[field] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} id="addArticle">
                <div className="control">
                    <label>Name</label>
                    <input
                        className="control-text"
                        type="text"
                        required="required"
                        value={this.state.title}
                        onChange={this.handleChange.bind(this, 'title')}
                    />
                </div>
                <div className="control">
                    <label>Description</label>
                    <input
                        className="control-text"
                        type="text"
                        required="required"
                        value={this.state.content}
                        onChange={this.handleChange.bind(this, 'content')}
                    />
                </div>
                <button type="submit">Save article</button>
            </form>
        );
    }
}

export default AddArticle;