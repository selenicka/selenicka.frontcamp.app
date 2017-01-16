import React, {Component} from 'react';

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    handleClick(e) {
        e.preventDefault();

        let urlAPI = 'http://localhost:3000/',
            request = new Request(urlAPI);

        let requestInit = {
            method: 'POST',
            mode: 'cors',
            //body: obj
        };

//        console.log(this.state.value);

        /*fetch(request, requestInit)
            .then(r => r.json())
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
            */
    }

    handleSubmit(e) {
        e.preventDefault();
        let urlAPI = 'http://localhost:3000/',
            request = new Request(urlAPI);

        let requestInit = {
            method: 'POST',
            mode: 'cors',
            //body: obj
        };

        console.log(this.state.title);

        /*fetch(request, requestInit)
         .then(r => r.json())
         .then(function (data) {
         console.log('Request succeeded with JSON response', data);
         })
         .catch(function (error) {
         console.log('Request failed', error);
         });
         */
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="control">
                    <label>Name</label>
                    <input className="control-text" type="text" name="title"/>
                </div>
                <button type="submit">Save article</button>
            </form>
        );
    }
}

export default AddArticle;