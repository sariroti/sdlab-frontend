import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Layout from '../layout/layout';
import { 
    requestPasswordChange, 
    changePassword, 
    verifyTokenPasswordChange 
} from '../../actions'


class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        
        this.state ={
            email:'',
            newPassword:'',
            error:'',
            message:'',
            isValidToken:false
        }
    };

    handleInputChange = (event) => {

        this.setState({[event.target.name]: event.target.value})
    }

    componentWillMount(){
        const qs = queryString.parse(this.props.location.search);
     
        if(qs){
            if(qs.otpt){
                this.props.verifyTokenPasswordChange(qs.otpt);
            }
        }
    }
    componentDidUpdate(){
     if(this.props.users){
            if(this.props.users.payload){
                if(this.props.users.payload.error){
                    this.setState({
                        error:this.props.users.payload.error
                    })
                    this.props.users.payload.error = '';
                }
                if(this.props.users.payload.data){
                    console.log('hehehhe',this.props.users.payload.data);
                 
                   
                    if(this.props.users.payload.data === 'Token Valid'){
                        this.setState({
                            isValidToken:true,
                            message:'Please change your password with the new one'
                        })
                    }

                    if(this.props.users.payload.data === 'Password Successfuly Changed!'){
                        this.setState({
                            isValidToken:true,
                            message:'Password Successfuly Changed!, Redirect in 5 second'
                        })

                        setTimeout(() => {
                            this.props.history.push('/login')
                        }, 5000);
                    }

                    this.props.users.payload.data = undefined;
                }
            }
        }
    }

    requestChange = () =>{
        this.props.requestPasswordChange(this.state.email);
    }

    submit = () => {
        const qs = queryString.parse(this.props.location.search);
        this.props.changePassword({token:qs.otpt,password:this.state.newPassword})
    }

    render(){
        return (
            <>
                <Layout/>
                <div className="d-flex flex-column align-items-center">
                    <h3>Forgot Password</h3>
                    <Form>
                        <div style={this.state.isValidToken ? {display:'none'}: {display:''}}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="abc@mail.com"  value={this.state.email} onChange={this.handleInputChange}/>
                            </FormGroup>
                            <div className="text-center">
                                <Button type="button" className="align-self-center" onClick={this.requestChange}>Request Change</Button>
                            </div>
                            <p>{this.state.error}</p>
                            <p>{this.state.message}</p>
                        </div>
                        <div style={this.state.isValidToken ? {display:''}: {display:'none'}}>
                            <FormGroup>
                                <Label for="password">New Password</Label>
                                <Input type="password" name="newPassword" id="password" value={this.state.newPassword} onChange={this.handleInputChange}/>
                            </FormGroup>
                            <div className="text-center">
                                <Button type="button" className="align-self-center" onClick={this.submit}>Submit</Button>
                            </div>
                            <p>{this.state.message}</p>
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
    { requestPasswordChange, changePassword,verifyTokenPasswordChange }
  )(ForgotPassword);