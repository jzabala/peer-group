import React, { Component } from 'react';
import Path from './Path';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <section className="container">
          <hr />
          <div className="row justify-content-center">
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
            <Path
              categories={["Book"]}
              title="You Don't Know JS: Up & Going"
              description="First in a book series on JavaScript by Kyle Simpson"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
