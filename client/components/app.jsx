var React = require('react');
var Artist = require('./artist.jsx');
var _ = require('lodash');
var http = require('axios');

var App = React.createClass({
    getInitialState: function() {
      return {
        suggestedArtists: []
      };
    },
    searchArtists: function(e) {
      var that = this;
      var name = React.findDOMNode(this.refs.artistName);

      http({
        url: 'http://developer.echonest.com/api/v4/artist/similar',
        method: 'get',
        params: {
          api_key: '6AAZODJ9WIPMS8879',
          format: 'json',
          name: name.value
        }
      }).then(function(result) {
        name.value = '';
        that.setState({
          suggestedArtists: result.data.response.artists
        })
      })
    },
    enterArtists: function(e) {
      if (e.keyCode === 13){
        return this.searchArtists();
      }
    },
    artistClick: function(e) {
      var that = this;
      http({
        url: 'http://developer.echonest.com/api/v4/artist/similar',
        method: 'get',
        params: {
          api_key: '6AAZODJ9WIPMS8879',
          format: 'json',
          name: e.target.text
        }
      }).then(function(result) {
        console.log(result.data.response.artists)
        that.setState({
          suggestedArtists: result.data.response.artists
        })
      })
    },
    render: function(){
      var that = this;
      return (
        <section>
          <h1> Search Your Favorite Artist </h1>
          <input type="text" placeholder="Type Here..." ref="artistName" onKeyDown={this.enterArtists}/>
          <button onClick={this.searchArtists}>Search</button>
          <section id="suggestedArtistsContainer">
            {_.map(this.state.suggestedArtists, function(artist, i){
              return (
                <Artist name={artist.name} onClick={that.artistClick} key={artist.id}/>
              )
            })}
          </section>
        </section>
      );
    },
    renderItem: function(artist) {
      return <li> {artist.name} </li>
    }

  });

module.exports = App;
