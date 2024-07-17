import React, { Component } from 'react';
import Spinlogo from './Spinlogo.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-3"src={Spinlogo} alt="Spinner-5" />
      </div>
    );
  }
}

export default Spinner;
