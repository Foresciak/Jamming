import React from 'react';

import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      loading: false,
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
      const playlistTracksArr = this.state.playlistTracks;
      if(this.state.playlistTracks.find(savedTrack => savedTrack.id===track.id)) {
        return;
      } else {
        playlistTracksArr.push(track);
      }
      this.setState(
        {
        playlistTracks: playlistTracksArr,
        }
      )
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  removeTrack(track) {
    const playlistTracksArr = this.state.playlistTracks;
    playlistTracksArr.splice(playlistTracksArr.findIndex(savedTrack => savedTrack.id===track.id),1);
    this.setState({playlistTracks: playlistTracksArr});
  }

  savePlaylist () {
    this.setState({loading: true})
    setTimeout(function(){Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks).then(
      this.setState({playlistName:'New Playlist', playlistTracks: [], loading: false})
    );},10000);

  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(tracks => {
      this.setState({searchResult: tracks});
    });
    console.log(this.state.searchResult)
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResult} onAdd={this.addTrack}  />
            <Playlist loading={this.state.loading} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }

}

export default App;
