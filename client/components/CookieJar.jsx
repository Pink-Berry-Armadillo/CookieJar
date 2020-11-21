import React, { Component } from 'react';
import { render } from 'react-dom';
import Cookie from './Cookie';

class CookieJar extends Component {
  // should render <p> tag with cookies info, which is passed down from Cookie Jar

  constructor(props) {
    super(props);
  }

  render() {
    const rawCookieArray = document.cookie.split('; ');
    const cookies = [];
    for (let i = 0; i < rawCookieArray.length; i++) {
      cookies.push(<Cookie key={i} cookie={rawCookieArray[i]} />);
    }
    return <div>{cookies}</div>;
  }
}

export default CookieJar;
