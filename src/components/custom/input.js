import React from 'react';
import { Input} from 'reactstrap';

export default class CustomInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDate: new Date()
        }
    }

    handleInputChange = (event) => {

        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        return (
            <Input onClick={this.props.onClick} value={this.props.value} onChange={this.handleInputChange} />
        )
    }
}
  
