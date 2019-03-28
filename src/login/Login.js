import React, {Component} from 'react';
import './Login.css'
import UrlsUtil from '../UrlsUtil'

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        let password = this.props.password;
        let room = {
            name: this.props.room,
            password: password === "" ? null : password
        };

        fetch(UrlsUtil.getUrl('/room/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room)
        })
            .then(
                (result) => {
                    result.status === 200 ?  this.props.connect(true): this.props.connect(false);
                },
                (error) => {
                    console.log("got error" + error);
                }
            )

    }

    render() {
        return (
            <div className="component-Login">
                Checking password
            </div>
        )
    }
}
