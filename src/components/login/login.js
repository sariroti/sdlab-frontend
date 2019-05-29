import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import Layout from '../layout/layout';
import { login } from '../../actions'


class Login extends React.Component {
    constructor(props){
        super(props);
        
        this.state ={
            email:'',
            password:''
        }
    };

    handleInputChange = (event) => {

        this.setState({[event.target.name]: event.target.value})
    }

    doLogin = () => {
        const user = {
            email:this.state.email,
            password:this.state.password
        }
       this.props.login(user);
       
    }

    componentDidUpdate(){
        if(Object.keys(this.props.users).length > 0){
            if(this.props.users.payload.user && this.props.users.payload.token){
                alert('login success!');
                this.props.history.push('/')
            }
            else if(this.props.users.payload != ''){
                alert(`login failed, ${this.props.users.payload}`)
                this.props.users.payload = '';
            }
        }
        
    }
    
    render(){
        return (
            <>
                <Layout/>
                <div className="d-flex flex-column align-items-center">
                    <h3>Login</h3>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="abc@mail.com"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="Password" value={this.state.password} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <div className="text-center">
                            <Button type="button" className="align-self-center" onClick={this.doLogin}>Submit</Button>
                        </div>        
                    </Form>
                </div>    
                
            </>
        )
    }


}

const mapStateToProps = state => {
  
    return { 
        users: state.users 
    };
};

export default connect(
    mapStateToProps,
    { login }
  )(Login);