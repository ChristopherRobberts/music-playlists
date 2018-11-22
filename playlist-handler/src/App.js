import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
        color: '#fff'
};

let fakeServerData = {
    user: {
        name: 'Chris',
        playlists: [
            {
                name: 'my favorite',
                songs: [
                        {title: 'Gospel burnout', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3}
                       ]
            },
            {
                name: 'my second favorite',
                songs: [
                        {title: 'Son of a robot', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3}
                       ]
            },
            {
                name: 'my third favorite',
                songs: [
                        {title: 'Cigarette daydream', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3}
                       ]
            },
            {
                name: 'my third favorite',
                songs: [
                        {title: 'Cigarette daydream', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3},
                        {title: 'etc', duration: 3}
                       ]
            }
        ]
    }
}

class PlaylistCounter extends Component {
    render() {
        return (
            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
                <h2>{this.props.playlists.length} playlists</h2>
            </div>
        );
    }
}

class HoursCounter extends Component {
    render() {
        let arr = [{name:'ahchoo'}].concat([{name:'blah'}])
        console.log(arr);
        let toSameArr = this.props.playlists
                        .reduce((acc, currObj) => {
                            return acc.concat(currObj.songs);
                        }, []);
        let totalSongDurations = toSameArr
                                .reduce((acc, curr) => {
                                    return acc + curr.duration;
                                }, 0);
        return (
            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
                <h2>{totalSongDurations} min</h2>
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return(
            <div style={defaultStyle}>
                <img/>
                <input type="text" onChange={event => {
                    this.props.onFilterChange(event.target.value);
                }}/>
            </div>
        );
    }
}

class Playlist extends Component {
    render() {
        return (
            <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
                <img/>
                <h3>{this.props.name}</h3>
                <ul>
                    {
                        this.props.songs.map((obj) => {
                            return <li>{obj.title}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            serverData: {},
            filterInput: ''
        }
    }

    componentDidMount() {
        this.setState({
            serverData: fakeServerData
        });
    }

    render() {
        return (
            <div className="App">
            {this.state.serverData.user ?
                <div>
                    <h1 style={defaultStyle}>
                        {
                            this.state.serverData.user &&
                            this.state.serverData.user.name
                        }'s playlists
                    </h1>
                    <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
                    <HoursCounter playlists={this.state.serverData.user.playlists}/>
                    <Filter onFilterChange={text => this.setState({filterInput: text})}/>
                    <div>
                        {
                            this.state.serverData.user.playlists
                            .filter(playlist =>
                                playlist.name
                                .toLowerCase()
                                .includes(this.state.filterInput.toLowerCase())
                            )
                            .map(playlist => <Playlist songs={playlist.songs} name={playlist.name}/>)
                        }
                    </div>
                </div>
                :
                <h1 style={defaultStyle}>searching for playlists..</h1>
                }
            </div>
            );
        }
    }

export default App;
