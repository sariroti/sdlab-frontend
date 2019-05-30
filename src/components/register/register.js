import React from 'react';
import { Button, Form, FormGroup, Label, Input, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import CustomInput from '../custom/input';
import { connect } from 'react-redux';
import Layout from '../layout/layout';
import { register } from '../../actions'

class Register extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            country:'Select Country',
            dob:'',
            dobDate:new Date(),
            email:'',
            password:'',
            sourceMediaReference:'',
            feedback:'',
            suggestions:'',
            willRecommend:false,
            avatar:'',
            dropdownOpen:false,
            isStep2:false
        }
    };

    handleInputChange = (event) => {
        if(event.target.name == 'willRecommend'){
            this.setState({[event.target.name]: event.target.checked})
        }else{
            this.setState({[event.target.name]: event.target.value})
        }
        
    }

    handleInputFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    avatar: e.target.result
                  })
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }

    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    handleCountrySelection = (event) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            country:event.target.innerText
          });
    }

    handleDateChange = (date) => {
        this.setState({
            dobDate: date
        });
    }

    nextStep = () => {
        this.setState({
            isStep2:true
        })
    }

    prevStep = () => {
        this.setState({
            isStep2:false
        })
    }

    submit = () => {
        const user = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            country:this.state.country,
            dob:moment(this.state.dobDate).format('YYYY-MM-DD'),
            email:this.state.email,
            password:this.state.password,
            sourceMediaReference:this.state.sourceMediaReference,
            feedback:this.state.feedback,
            suggestions:this.state.suggestions,
            willRecommend:this.state.willRecommend,
            avatar: {
                data :this.state.avatar,
                contentType:'image'
            }
        }
        this.props.register(user);
    }
    
    componentDidUpdate(){
        console.log(this.props.users);
        if(Object.keys(this.props.users).length > 0){
            if(this.props.users.payload.user && this.props.users.payload.token){
                alert('User Successfuly Registered!');
                this.props.history.push('/')
            }
            else if(this.props.users.payload != ''){
                alert(`Registration failed, ${this.props.users.payload}`)
                this.props.users.payload = '';
            }
        }
        
    }
    
    render(){
    
        return (
            <>
                <Layout/>
                <div className="d-flex flex-column align-items-center">
                    <h3>Register</h3>
                    <Form>
                        <div style={this.state.isStep2 ? {display:'none'} : {}}>
                        <FormGroup>
                            <Label for="avatar">Avatar</Label>
                            <Input type="file" name="avata" id="avatar" onChange={this.handleInputFileChange}/>
                            <img src={this.state.avatar} /> 
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text" name="phoneNumber" id="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Country</Label>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                {this.state.country}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem  onClick={this.handleCountrySelection}>Indonesia</DropdownItem>
                                    <DropdownItem  onClick={this.handleCountrySelection}>Singapore</DropdownItem>
                                 </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <FormGroup>
                            <DatePicker
                                selected={this.state.dobDate}
                                onChange={this.handleDateChange}
                                dateFormat="dd/MM/YYYY" 
                                customInput={<CustomInput date={this.state.dobDate} />}
                               
                            />
                        </FormGroup>    
                        <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="abc@mail.com"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="Password" value={this.state.password} onChange={this.handleInputChange}/>
                        </FormGroup>
                        <div className="text-center">
                            <Button type="button" className="align-self-center" onClick={this.nextStep}>Next</Button>
                        </div>        
                        </div>
                        <div style={this.state.isStep2 ? {} : {display:'none'}}>
                            <FormGroup>
                                <Label for="sourceMediaReference">source Media Reference</Label>
                                <Input type="text" name="sourceMediaReference" id="sourceMediaReference" value={this.state.sourceMediaReference} onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="feedback">Feedback</Label>
                                <Input type="text" name="feedback" id="feedback" value={this.state.feedback} onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sourceMediaReference">Suggestions</Label>
                                <Input type="text" name="suggestions" id="suggestions" value={this.state.suggestions} onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" name="willRecommend" value={this.state.willRecommend} onChange={this.handleInputChange}/>{' '}
                                Will Recommend ?
                                </Label>
                            </FormGroup>
                            <div className="text-center">
                                <Button type="button" onClick={this.prevStep}>Prev</Button>
                                <Button type="button" onClick={this.submit}>Submit</Button>
                            </div>
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
    { register }
  )(Register);