import React, {Component} from 'react';
import './ChatBox.css';
import './aside/Aside.css'
import Room from "./menu-app-bar/Room";
import Login from "./login/Login";
import TextField from '@material-ui/core/TextField';
import {UrlsUtilStatic} from './UrlsUtil';


export default class RoomBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                rooms: [],
                isLoginCrashed: false,
                isLoginMode: false,
                user: '',
                password: '',
                room: '',
                newRoom: '',
                newPassword: '',
                created: false
            };
    }


    componentDidMount() {
        fetch(UrlsUtilStatic.getUrl("/rooms/"))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        rooms: result
                    });
                },
                (error) => {
                    console.log("got error" + error);
                    this.setState({
                        error: 'Could not get rooms!'
                    });
                }
            )
    }

    enterRoom = (room, user, password) => {
        console.log(room, user, password);

        this.setState({
            isLoginMode: true,
            room: room,
            user: user,
            password: password
        });
    };

    connectionEstablished = (isSuccess, client) => {
        if (isSuccess) {
            this.setState({
                isLoginMode: false,
                isLoginCrashed: false
            });
            this.props.onRoomLogin(this.state.room, this.state.user, client);
        } else {
            this.setState({
                isLoginMode: false,
                isLoginCrashed: true
            });
        }

    };

    handleNewRoomPasswordCreate(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    handleNewRoomCreate(e) {
        this.setState({
            newRoom: e.target.value
        });
    }

    createNewRoom = () => {
        let room = {
            name: this.state.newRoom,
            password: this.state.newPassword === "" ? null : this.state.newPassword
        };
        fetch(UrlsUtilStatic.getUrl('/room/create'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room)
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.state.rooms.push(responseData.name);
                this.setState({
                    rooms: this.state.rooms,
                    newRoom: '',
                    newPassword: '',
                    created: true
                });
            });
    }


    render() {
        let view = this.state.isLoginMode ?
            (<Login connect={this.connectionEstablished} password={this.state.password} room={this.state.room}
                    user={this.state.user}/>) :
            (
                <div id="container">
                    {this.state.isLoginCrashed ? (<div> Password is incorrect </div>) : (<span/>)}

                    <aside>
                        <div className="vr"></div>
                        <ul>
                            {this.state.rooms.map((room, i) =>
                                <li key={i}>
                                    <Room room={room} onRoomEntered={this.enterRoom}/>
                                </li>
                            )}
                        </ul>
                    </aside>
                    <ul id="chat" ref="messageBox">
                        {this.state.created ? (<div>New Room created</div>) : (<span></span>)}
                        <li><TextField
                            value={this.state.newRoom}
                            onChange={this.handleNewRoomCreate.bind(this)}
                            label="new room name"
                            type="search"
                            margin="normal"
                        /></li>
                        <li><TextField
                            value={this.state.newPassword}
                            onChange={this.handleNewRoomPasswordCreate.bind(this)}
                            label="room password or empty"
                            type="search"
                            margin="normal"
                        /></li>
                        <li>
                            <button
                                className="btn btn-default"
                                onClick={this.createNewRoom}>Create new Room
                            </button>
                        </li>
                    </ul>
                    <div className="footerComponent"></div>

                </div>
            );
        return view;
    }
}