import React, { Component } from 'react';
import Path from './Path';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <section className="container">
          <div className="card-columns App_card-colums">
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First book in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First book in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First book in a book series on JavaScript by Kyle Simpson"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
