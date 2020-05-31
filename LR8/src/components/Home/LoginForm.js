import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Cookies from 'universal-cookie';
const password = "1111";
const login = "Vlad"
const cookies = new Cookies();
class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        login: '', 
        password: '',
        loginError: '',
        passwordError: ''
      };
      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.clearValid = this.clearValid.bind(this);
    }

    clearValid() {
      this.setState({loginError: "", passwordError: ""});
    }

    onSubmit(event) {
      event.preventDefault();
      
      if(this.state.login !== login) {
        this.setState({loginError: "login is wrong"})
      }

      if(this.state.password !== password) {
        this.setState({passwordError: "password is wrong"})
      }

      if(this.state.login === login && this.state.password === password) {
        cookies.set('user', login);
        this.props.history.push("/dashboards");
      }
    }

    onChangePassword(event){
      this.clearValid();
      this.setState({password: event.target.value});
    }

    onChangeLogin(event) {
      this.clearValid();
      this.setState({login: event.target.value});
    }

    componentWillMount() {
      if (cookies.get('user')) {
        this.props.history.push("/dashboards");
     }
    }

    render() {
      return (
        <div className = "login-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="username" name="login" value={this.state.login}
                            onChange={this.onChangeLogin}/>
                            <div>{this.state.loginError}</div>
          <input type="password" placeholder="password"  name="password" value={this.state.password}
                            onChange={this.onChangePassword} />
                            <div>{this.state.passwordError}</div>
          <button>login</button> 
        </form>
      </div>
        // <div className = "login-form">
        //   <form onSubmit={this.onSubmit}>
        //     <p><label> Логин: <input type="text" name="login" value={this.state.login}
        //                       onChange={this.onChangeLogin}/></label></p>
        //                       <div>{this.state.loginError}</div>
        //     <p><label> Пароль: <input type="password" name="password" value={this.state.password}
        //                       onChange={this.onChangePassword}/></label></p>
        //                       <div>{this.state.passwordError}</div>
        //     <p><input type="submit" value="Submit" /></p>
        //     <input type="text" placeholder="username"/>
        //     <input type="password" placeholder="password"/>
        // <button>login</button> 
        //   </form>
        // </div>
      );
    }
  }

  export default LoginForm;