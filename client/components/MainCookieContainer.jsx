import React, { Component } from 'react';
import { render } from 'react-dom';
import CookieJar from './CookieJar';

const MainCookieContainer = (props) => (
  <div>
    <h2>Welcome to the Cookie Jar</h2>
    <CookieJar />
  </div>
);

export default MainCookieContainer;
