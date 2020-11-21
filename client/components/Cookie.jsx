import React, { Component } from 'react';
import { render } from 'react-dom';

class Cookie extends Component {

    // should render <p> tag with cookies info, which is passed down from Cookie Jar

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <p>{this.props.cookie}</p>
        </div>
        );
    }
}

export default Cookie;
