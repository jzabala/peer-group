import React from 'react';
import Path from './Path';

const PathsPage = (props) => (
  <section className="container">
    <hr />
    <div className="row justify-content-center">
      <Path
        categories={["Book"]}
        title="You Don't Know JS: Up & Going asdfadsfads"
        description="First in a book series on JavaScript by Kyle Simpson"
      />
      <Path
        categories={["Book"]}
        title="CS50"
        description="A Edx course."
      />
      <Path
        categories={["Book"]}
        title="You Don't Know JS: Up & Going"
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
);

export default PathsPage;
