import React, {Component} from 'react';
import '../aside/Aside.css'
import Room from "./Room";

export default class RoomsMenuBar extends Component {

    constructor(props) {
        super(props);
    }

    enterRoom(room, user, password) {
        this.props.onRoomLogin(room, user, password);
    }

    render() {
        console.log('rooms', this.props.rooms)
        return (
            <aside>
                <div className="vr"></div>
                <ul >
                    {this.props.rooms.map((room, i) =>
                        <li key={i}>
                            <Room room={room} onRoomEntered={this.enterRoom}/>
                        </li>
                    )}
                </ul>
            </aside>

        )
    }
}

