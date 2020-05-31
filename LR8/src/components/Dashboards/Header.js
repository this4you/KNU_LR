import React, { Component } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Header extends Component {
    constructor(props) {
        super(props);
        this.onLogOut = this.onLogOut.bind(this);
    }

    onLogOut() {
        cookies.remove("user");
        this.props.history.push("/home");
    }

    render() {
        return (
            <header className="header">
                <h1>Weather</h1>
                <i className="fas fa-sign-out-alt logout-icon" onClick={this.onLogOut}></i>
            </header>
        )
    }
}
// function Header(props) {
//     const history = props = props.history;
//     function logOutClick() {
//         cookies.remove("user");
//         debugger;
//     }

//     return (
//         <header className="header">
//             <h1>Weather</h1>
//             <i className="fas fa-sign-out-alt logout-icon" onClick={logOutClick}></i>
//         </header>
//     );
// }

export default Header;