/* eslint-disable react/prop-types */
const React = require('react');
const Layout = require('./Layout');
const Card = require('./Card');

module.exports = function Main({ notes }) {
  return (
    <Layout>
      <section className="container">
        <form action="/" method="POST">
          <div className="m-3 d-flex">
            <div className="col-10">
              <input type="text" name="note" className="form-control" placeholder="Your note" />
            </div>

            <div className="col-2">
              {' '}
              <button type="submit" className="btn btn-primary">Add note</button>
            </div>
          </div>
        </form>

        <section id="list">
          {notes.length === 0 ? 'No data' : notes.map((note) => (
            <Card key={note.id} note={note.text} />
          ))}
        </section>
      </section>
    </Layout>
  );
};
