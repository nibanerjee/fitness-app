import React from 'react';
import { connect } from 'react-redux';
import { PersistBMIData,FetchBMIData } from '../actions';
import './BMICalculator.scss';

class BMICalculator extends React.Component{
    state = {
        gender : '',
        age : '',
        weight : '',
        height : '',
        goal : '',
    }

    componentDidMount(){
        this.props.FetchBMIData();
    }

    componentDidUpdate(prevProps){
        if((this.props.loggedInUserId != prevProps.loggedInUserId) 
        || (this.props.existingUserId == this.props.loggedInUserId)){
            this.props.FetchBMIData();
        }
    }

    onGenderChange = (e,gender) => {
        const span = e.target.closest("span");
        if (span && e.target.contains(span)) {
          return;
        }
        this.setState({gender});
    }
    onAgeChange = (event) => {
        this.setState({ age : event.target.value});
    }
    onWeightChange = (event) => {
        this.setState({ weight : event.target.value});
    }
    onHeightChange = (event) => {
        this.setState({ height : event.target.value});
    }
    onGoalChange = (e,goal) => {
        const span = e.target.closest("span");
        if (span && e.target.contains(span)) {
          return;
        }
        this.setState({goal});
    }
    clearFields = () => {
        this.setState({gender : ''});
        this.setState({goal : ''});
        this.setState({age : ''});
        this.setState({weight :''});
        this.setState({height : ''});
        document.querySelectorAll('input[type="radio"]:checked').forEach((item) => {
            item.checked = false;
        });
    }
    calculateBMI = () => {
        if(this.state.age != '' && this.state.weight != '' && this.state.height != ''){
            const weight = this.state.weight;
            const heightInMetres = this.state.height / 100;
            const bmi = weight / (heightInMetres * heightInMetres);
            this.props.PersistBMIData(bmi);
        }
    }
    render(){
        const userDataPresent = (this.props.existingUserId != this.props.loggedInUserId) ? true : false;
        return (
            <div className="row bmi-calc-page">
                <div className="col-md-5 calculator">
                    {(userDataPresent || this.props.loggedInUserId == null) ? ( 
                        <div className="col-md-12 no-padding">
                            <span className="col-md-12 no-padding">BODY PARAMETERS</span>
                            <div className="col-md-12 no-padding clearfix gender-container">
                                <label className="pull-left" onClick={(e) => this.onGenderChange(e,'MALE')}>
                                    <input type="radio" name="gender"/>
                                    <span className="male">MALE</span>
                                </label>
                                <label className="pull-right" onClick={(e) => this.onGenderChange(e,'FEMALE')}>
                                    <input type="radio" name="gender"/>
                                    <span className="female">FEMALE</span>
                                </label>
                            </div>
                            <div className="col-md-12 no-padding body-stats-container">
                                <input className="body-stats-col" type="text" placeholder="enter age" onChange={this.onAgeChange} value={this.state.age}/>
                                <input className="body-stats-col" type="text" placeholder="enter weight (kg)" onChange={this.onWeightChange} value={this.state.weight}/>
                                <input className="body-stats-col" type="text" placeholder="enter height (cm)" onChange={this.onHeightChange} value={this.state.height}/>
                            </div>
                            <div className="col-md-12 no-padding divider"><hr/></div>
                            <span className="col-md-12 no-padding">TRAINING GOAL</span>
                            <div className="col-md-12 no-padding goal-container">
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'LOSS')}>
                                    <input type="radio" name="goal"/>
                                    <span className="loss">LOSS</span>
                                </label>
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'GAIN')}>
                                    <input type="radio" name="goal"/>
                                    <span className="gain">GAIN</span>
                                </label>
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'MAINTAIN')}>
                                    <input type="radio" name="goal"/>
                                    <span className="maintain">MAINTAIN</span>
                                </label>
                            </div>
                            <div className="col-md-12 no-padding divider"><hr/></div>
                            <div className="col-md-12 button-container no-padding clearfix">
                                <button className="clear pull-left" onClick={this.clearFields}>CLEAR</button>
                                <button className="calc pull-right" onClick={this.calculateBMI}>CALCULATE</button>
                            </div>
                        </div>
                    ) : (
                        <div className="col-md-12 no-padding">
                            your bmi is {this.props.existingUserBMI}
                        </div>
                    )}
                </div>
                <div className="col-md-7 training-module">
                    
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        existingUserBMI : state.user.bmi,
        existingUserId : state.user.userId,
        loggedInUserId : state.auth.userId
    }
}

export default connect (mapStateToProps,{PersistBMIData,FetchBMIData})(BMICalculator);