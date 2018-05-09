import React from 'react';

import './MyLoader.css';

export class MyLoader extends React.Component {

  render () {
    return (
      <div className="loading">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    )
  }

}
