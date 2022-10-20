const React = require('react');

module.exports = function Card({ note }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <p className="card-text">{note}</p>
      </div>
    </div>
  );
};
