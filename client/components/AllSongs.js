import React, { Component } from 'react';
import { getSongs } from '../reducers/songsReducer';
import { connect } from 'react-redux';
import Song from './Song.js'

const audio = document.createElement('audio');

class AllSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSong: {},
      paused: false
    }
    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidMount() {
    this.props.getSongs();
  }

  togglePlay(ev, song, uri) {
    if (this.state.currentSong.id && (this.state.currentSong.id === song.id)) {
      if (audio.paused) {
        audio.play();
        this.setState({ paused: false })
      } else {
        audio.pause();
        this.setState({ paused: true })
      }
    } else {
      audio.src = uri
      audio.load();
      audio.play();
      this.setState({ currentSong: song, paused: false })
    }
  }

  render() {
    return (
      <div>
        <table id="songs">
          <tbody>
            <tr>
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>Hash</td>
            </tr>
            {
              this.props.songs.map(song => {
                return (
                  <Song
                    key={song.hash}
                    song={song}
                    togglePlay={this.togglePlay}
                    currentSong={this.state.currentSong}
                    paused={this.state.paused}
                  />
                )})
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: state.songs
});

const mapDispatchToProps = dispatch => ({
  getSongs: () => dispatch(getSongs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSongs);
