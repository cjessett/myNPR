import React, { Component } from 'react';
import './App.css';
import NPR from './util/npr';

const nprInstance = NPR();

class App extends Component {
  constructor() {
    super()
    this.state = { stations: [] }
  }

  componentDidMount() {
    nprInstance.fetchStations().then(stations => this.setState({ stations }))
  }

  renderStation(station) {
    return (
      <div className="station" key={station.frequency}>
        <div style={{ display: 'inline-block' }}><img className="logo" src={station.image} alt="logo"></img></div>
        <div style={{ display: 'inline-block' }}>
          {station.frequency} - {station.call} - {station.name} - {station.marketCity}, {station.marketState}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://media.npr.org/chrome_svg/npr-logo-color.svg" className="App-logo" alt="logo" />
          <h1 className="App-title">NPR Stations Nearby</h1>
        </header>
        <main className="stations">
          <div className="station-container">
            {this.state.stations.length ?
             this.state.stations.map(this.renderStation) :
             "Can't find any stations nearby"}
          </div>
        </main>
        <footer>
          <span>Made with</span>
          <span className="heart">
            <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
              <path fillRule="evenodd" d="M9 2c-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-1.632.086-2.954 1.333-3 3 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.047-1.69-1.342-2.913-3-3z"></path>
            </svg>
          </span>
          <span>by <a id="cjessett" href="https://cjessett.com">cjessett</a></span>
        </footer>
      </div>
    );
  }
}

export default App;
