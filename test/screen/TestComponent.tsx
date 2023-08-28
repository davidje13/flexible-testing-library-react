import React from 'react';

export default ({ override = 'Some text' }) => (
  <section>
    <div data-testid="a">{override}</div>
    <div data-testid="b">Some different text</div>
    <div data-testid="c">More text</div>
    <div data-testid="d">More text</div>
  </section>
);
