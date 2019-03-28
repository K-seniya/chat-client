import React, {Component} from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import  {UrlsUtilStatic} from "./UrlsUtil";

export default class RoomBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.state = {
            rooms: [],
        };
    }

    componentDidMount() {
        this.loadRoomsFromServer();
    }

    // Load rooms from database
    loadRoomsFromServer() {
        //
        // axios.get(UrlsUtilStatic.getUrl('/rooms/'))
        //     .then(res => {
        //         this.setState({
        //             rooms: res,
        //         });
        //     })


        fetch(UrlsUtilStatic.getUrl('/rooms/'))
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    rooms: responseData,
                });
            });
    }

    // Delete room
    deleteRoom(room) {
        fetch(UrlsUtilStatic.getUrl('/room/delete/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room)
        })
            .then(
                res => this.loadRoomsFromServer()
            )
            .catch(err => {
                this.setState({
                    error: 'Could not delete!'
                })
            })
    }

    // Create new room
    createRoom(room) {
        fetch(UrlsUtilStatic.getUrl('/room/create'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room)
        })
            .then(
                res => this.loadRoomsFromServer()
            )
            .catch(err => {
                this.setState({
                    error: 'Could not create!'
                })
            })
    }

    render() {
        return (
            <div>
                <RoomForm createRoom={this.createRoom}/>
                <RoomTable deleteRoom={this.deleteRoom} rooms={this.state.rooms}/>
            </div>
        );
    }
}

class RoomTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rooms = this.props.rooms.map(room =>
            <Room key={room.id} room={room} />
        );

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th><th> </th>
                    </tr>
                    </thead>
                    <tbody>{rooms}</tbody>
                </table>
            </div>);
    }
}

class Room extends Component {
    constructor(props) {
        super(props);
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    deleteRoom() {
        this.props.deleteRoom(this.props.room);
    }

    render() {
        return (
            <tr>
                <td>{this.props.room.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={this.deleteRoom}>Delete</button>
                </td>
            </tr>
        );
    }
}

class RoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', id: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log("NAME: " + event.target.name + " VALUE: " + event.target.value)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        var newRoom = {name: this.state.name, password: this.state.password};
        this.props.createRoom(newRoom);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Create room</div>
                <div className="panel-body">
                    <form className="form-inline">
                        <div className="col-md-2">
                            <input type="text" placeholder="Name" className="form-control"  name="name" onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <input type="text" placeholder="Password" className="form-control" name="password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}