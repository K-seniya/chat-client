
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './MenuAppBar.css'

import Badge from '@material-ui/core/Badge';
import Notifications from '../NotificationsComponent'
import BellIcon from 'react-bell-icon';


export default class MenuAppBar extends React.Component {


  constructor(props) {
    super(props);
    this.state =
      {
        openNotifications: false,
        anchorEl: null,
      };
  }

  handleOpenNotifications = () => {
    this.setState({
      openNotifications: true
    })
  };

  handleCloseNotifications = () => {
    this.setState({
      openNotifications: false
    })
  };

  render() {
    return (
      <div className="">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className="">
              {this.props.username} <span> </span> <span className="status green"></span>
            </Typography>
          </Toolbar>
          <div>

            {/*<Badge className="badge" badgeContent={this.props.roomNotification.length} color="secondary" onClick={this.handleOpenNotifications}>*/}
              {/*<BellIcon active={this.props.bellRing} animate={this.props.bellRing} color="white" width="25px" />*/}
            {/*</Badge>*/}
            {/*<Notifications open={this.state.openNotifications} handleClose={this.handleCloseNotifications}*/}
              {/*notifications={this.props.roomNotification} roomMessages={this.props.broadcastMessage} />*/}

          </div>
        </AppBar>
      </div>
    );
  }
}



