import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
  
  export default class Layout extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isLogin:sessionStorage.getItem('jwtToken') !== null,
        isOpen: false
      };

      console.log(sessionStorage.getItem('jwtToken'));
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Strategic Digital LAB</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem style={this.state.isLogin ? {display:'none'} : {display:''}}>
                  <NavLink href="/login">login</NavLink>
                </NavItem>
                <NavItem style={this.state.isLogin ? {display:'none'} : {display:''}}>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem style={this.state.isLogin ? {display:'none'} : {display:''}}>
                  <NavLink href="/forgot-password">Reset</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar style={this.state.isLogin ? {display:''} : {display:'none'}}>
                  <DropdownToggle nav caret>
                    Me
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }