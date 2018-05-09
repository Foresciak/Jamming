import React from 'react';

import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.play = this.play.bind(this);
  }

  addTrack() {
    const track = this.props.track;
    this.props.onAdd(track);
  }

  removeTrack() {
    const track = this.props.track;
    this.props.onRemove(track)
  }

  play() {
    const audio = new Audio(this.props.track.previewURL);
    audio.play();
  }

  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <a className="Track-action" onClick={this.play}>
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </a>
        </div>
        {this.props.isRemoval ? (<a className="Track-action" onClick={this.removeTrack}>-</a>
      ) : (
        <a className="Track-action" onClick={this.addTrack}>+</a>)}
      </div>
    )
  }

}
