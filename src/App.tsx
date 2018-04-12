import * as React from 'react';
import './App.css';
import MCore from './MCore';

const logo = require('./logo.svg');

class App extends React.Component {
  constructor(props: object) {
    super(props);
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title"><img src="lpp-icon.png" className="logo"/> Reactpad</h1>
        </header>
        <p className="App-intro">
          Plug Launchpad Pro into browser (USB to Computer or Android)<br/>...build custom instruments with Javascript!
        </p>
        <MCore defaultName="World" midiSet="Uninitialized" defaultMidiAccess="null" />
        <p>
          Brought to you by <a href="http://fenixsong.com">FENIX SONG</a>
        </p>
      </div>
    );
  }
}

export default App;
