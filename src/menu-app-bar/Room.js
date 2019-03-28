import React, {Component} from 'react';
import '../aside/Aside.css'
import roomIcon from '../room-icon.jpg';
import TextField from '@material-ui/core/TextField';

export default class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            user: ''
        }
    }

    handleClick = (e) => {
        this.props.onRoomEntered(this.props.room, this.state.user, this.state.password, true)
    };

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleUserNameChange(e) {
        this.setState({
            user: e.target.value
        });
    }

    render() {
        return (
            <section>
                <img src={roomIcon} alt="Room"/>
                <div>
                    <div><h2 style={{textAlign: "left", float: "left"}}>{this.props.room}</h2>
                    </div>
                    <TextField
                        value={this.state.password}
                        onChange={this.handlePasswordChange.bind(this)}
                        label="room password"
                        type="search"
                        margin="normal"
                    />
                    <TextField
                        value={this.state.username}
                        onChange={this.handleUserNameChange.bind(this)}
                        label="user name"
                        type="search"
                        margin="normal"
                    />
                    <button
                        className="btn btn-default"
                        onClick={this.handleClick}>Enter room
                    </button>
                </div>
            </section>
        )
    }
}
