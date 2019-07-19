import React from 'react';
import { connect } from 'react-redux';
import { PersistBMIData,FetchBMIData,FetchWorkoutData,EditBMIData} from '../actions';
import { headerItems } from './Constants';
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
        this.setActiveItem();
        this.props.FetchBMIData();
    }

    componentDidUpdate(prevProps,prevState){
        if((this.props.existingUserBMI !== prevProps.existingUserBMI) 
        ||(this.props.existingUserGoal !== prevProps.existingUserGoal)){
            this.props.FetchWorkoutData();
        } else if((this.props.loggedInUserId !== prevProps.loggedInUserId) 
        || (this.props.existingUserId === this.props.loggedInUserId && this.state === prevState)){
            this.props.FetchBMIData();
        }
    }
    
    setActiveItem = () => {
        var path = this.props.history.location.pathname;
        headerItems.map(function(val,ind) {
          val.active = false;
          if(val.link === path) {
            val.active = true;
          }
        })
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
        if(this.state.age !== '' && this.state.weight !== '' && this.state.height !== '' && 
        this.state.gender !== '' && this.state.goal !== ''){
            const weight = this.state.weight;
            const heightInMetres = this.state.height / 100;
            const bmi = weight / (heightInMetres * heightInMetres);
            if(this.props.existingUserBMI === null){
                this.props.PersistBMIData(bmi,this.state.gender,this.state.goal);
            } else {
                this.props.EditBMIData(bmi,this.state.gender,this.state.goal);
            }
        }
    }
    render(){
        return (
            <div className="row bmi-calc-page">
                <div className="col-md-5 calculator">
                    <div className="col-md-12 no-padding">
                            <span className="col-md-12 no-padding">BODY PARAMETERS</span>
                            <div className="col-md-12 no-padding clearfix gender-container">
                                <label className="pull-left" onClick={(e) => this.onGenderChange(e,'male')}>
                                    <input type="radio" name="gender"/>
                                    <span className="male">MALE</span>
                                </label>
                                <label className="pull-right" onClick={(e) => this.onGenderChange(e,'female')}>
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
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'loss')}>
                                    <input type="radio" name="goal"/>
                                    <span className="loss">LOSS</span>
                                </label>
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'gain')}>
                                    <input type="radio" name="goal"/>
                                    <span className="gain">GAIN</span>
                                </label>
                                <label className="goal-col" onClick={(e) => this.onGoalChange(e,'maintain')}>
                                    <input type="radio" name="goal"/>
                                    <span className="maintain">MAINTAIN</span>
                                </label>
                            </div>
                            <div className="col-md-12 no-padding divider"><hr/></div>
                            <div className="col-md-12 button-container no-padding clearfix">
                                <button className="clear pull-left" onClick={this.clearFields}>CLEAR</button>
                                <button className="calc pull-right" onClick={this.calculateBMI}>CALCULATE</button>
                            </div>
                            <div className="arrow-right"></div>
                    </div>
                </div>
                <div className="col-md-7 training-module-wrapper">
                    <div className="col-md-12 training-module">
                        {this.props.existingUserBMI != null && this.props.loggedInUserId != null && this.props.userWorkout != null ? (
                            <div className="col-md-12 no-padding">
                                <div className="clearfix">
                                    <div className="pull-left">
                                        BMI : <span className="bmi-val">{this.props.existingUserBMI}</span>
                                    </div>
                                    <div className="pull-right">
                                        GOAL : <span className="bmi-val">{this.props.existingUserGoal}</span>
                                    </div>
                                </div>
                                <div className="workout-icon"></div>
                                <ul className="workout-list">
                                    {this.props.userWorkout.map((workout,index) => {
                                        return <li className="workout-item clearfix" key={index}><span className="pull-left workout-badge"></span><span className="pull-left">{workout.suggestion}</span></li>
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <div className="col-md-12 no-padding">No BMI data present.Please login to access your workouts or calculate BMI if you're a first time user.</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        existingUserGoal : state.user.goal,
        existingUserBMI : state.user.bmi,
        existingUserId : state.user.userId,
        loggedInUserId : state.auth.userId,
        userWorkout : state.workout.workouts
    }
}

export default connect (mapStateToProps,{PersistBMIData,FetchBMIData,FetchWorkoutData,EditBMIData})(BMICalculator);