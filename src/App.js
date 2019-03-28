import React, { Component } from 'react';
import RoomBoard from './RoomBoardComponent';
import ChatBox from './ChatBoxComponent';
// Re-using my ErrorBoundary Component 
import ErrorBoundary from 'react-error-boundary-component-fallback2';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatMode: false,
      room: '',
      user: '',
      password: '',
      isLoginCrashed: false,
      stompClient: ''
    }
  }

  refreshPage(){
    window.location.reload();
  }

  handleLogin = (room, user) => {
    this.setState({
      isChatMode: true,
      room: room,
      user: user
    });
  }

  render() {
    return (
      <ErrorBoundary headerColor="lightseagreen" errorTitle="Server Error" 
      errorText="Unable to not connect you to the Chat Room Server. Please refresh this page and try again!" 
      buttonType={['', 'primary', '', '']} buttonLabel={['', 'Refresh', '', '']} modal={true} autoScrollBodyContent={false}
      customContentStyle={null} onClick={this.refreshPage}>
         {this.state.isChatMode ?
             (<ChatBox room={this.state.room} user={this.state.user}/>)
             : (<RoomBoard onRoomLogin={this.handleLogin}/>)}
       </ErrorBoundary>

    );
  }
}

export default App;
