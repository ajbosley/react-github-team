import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Card, CardText, CardBody,
  CardTitle, CardSubtitle } from "reactstrap";
import './index.css'
class App extends Component {
    state = {
      users: [],
      spinner: false
    };

  getUser = async (userName) => {
    this.setState({
      spinner: true
    })
    return await fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then((userResponse) => {
        this.setState(prevState => ({
          users: [...prevState.users, userResponse]
        }))
      })
      .then(() => {
        this.setState({
          spinner: false
        });
      })
      .catch((err) => {
        console.log("error");
        console.log("error " + err.statusText)
        alert(err)
      });
  }

  clearTeam = () => {
    this.setState({
      users: []
    })
  }

  render() {
    return (
        <div>
          <SearchBox  getUser={this.getUser} clearTeam={this.clearTeam}/>
          <UserCardList users={this.state.users}/>
        </div>
    );
  }
}

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    this.props.getUser(this.state.userName)
  }
  render() {
    return (
        <div className="searchBox" style={{margin:'auto', padding:'10px'}}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button onClick={this.handleSubmit}>Add</Button>
            </InputGroupAddon>
            <Input placeholder="Github Username" onChange={(event)=> this.setState({userName: event.target.value})}/>
            <InputGroupAddon addonType="append">
            <Button onClick={this.props.clearTeam}>Clear</Button>
        </InputGroupAddon>
          </InputGroup>
        </div>
    );
  }
}

const UserCard = (props) =>{

  return (
  <div className="userCard">
      <Card key={props.id}>
      <img className="userAvatar" src={props.avatar_url} alt="User Avatar" />
        <CardBody>
          <CardTitle>{props.login}</CardTitle>
          <CardSubtitle>{props.company}</CardSubtitle>
          <CardText>{props.bio}</CardText>
        </CardBody>
      </Card>
  </div>
  )
}

const UserCardList = (props) => {
    return (
      <div className="userCardList">
        {props.users.map(user => <UserCard key={user.id} {...user} />)}
      </div>
    );
  };


    
export default App;
