import React from 'react';
import Sidebar from './Sidebar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}
