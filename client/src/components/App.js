import React, { Component } from 'react';
import Path from './Path';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
          <a className="navbar-brand" href="#">Peer Group</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">New Path</a>
              </li>
            </ul>
          </div>
        </nav>
        <section className="container">
          <hr />
          <div className="card-columns App_card-colums">
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
