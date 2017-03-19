import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    StatusBar
} from 'react-native';

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            btStartIsDisabled: false,
            btStopIsDisabled: false,
            isShowStartStop: true,
            isShowReset: false
        };
        this.timeinterval = null;
    }
    componentDidMount() {
        this.btStopIsDisabled(true);

        let autoStart = this.props.autostart;

        if(autoStart)
            this.initializeTimer();
    }

    initializeTimer() {

        this.updateTimer();

        this.timeinterval = setInterval(this.updateTimer.bind(this), 1000);

        this.btStartIsDisabled(true);
        this.btStopIsDisabled(false);
        this.showHideStartStopBtns(true);
        this.showHideResetBtns(false);
    }
    updateTimer() {
        let t = this.getTimeRemaining();
        if (t <= 0) {
            this.stopTimer();
        }
    }
    getTimeRemaining() {
        const { downTimer } = this.props;
        let endTime = this.props.timer;

        if(this.props.down && endTime > 0)
            downTimer();

        return endTime;
    }
    stopTimer()
    {
        clearInterval(this.timeinterval);
        this.showHideStartStopBtns(false);
        this.btStartIsDisabled(false);
        this.showHideResetBtns(true);
    }
    manualStopTimer()
    {
        clearInterval(this.timeinterval);
        this.btStartIsDisabled(false);
        this.btStopIsDisabled(true);
    }
    startTimer()
    {
        this.initializeTimer();
    }
    resetTimer() {
        const { resetTimerAction } = this.props;
        resetTimerAction();
        this.btStartIsDisabled(false);
        this.btStopIsDisabled(true);
        this.showHideStartStopBtns(true);
        this.showHideResetBtns(false);
    }
    showHideStartStopBtns(isShow){
        this.setState({isShowStartStop: isShow});
    }

    showHideResetBtns(isShow){
        this.setState({isShowReset: isShow});
    }

    btStartIsDisabled(val){
        this.setState({btStartIsDisabled: val});
    }
    btStopIsDisabled(val){
        this.setState({btStopIsDisabled: val});
    }
    renderButtonStart(){
        if(this.props.isBtns != false)
        {
            let isDisabled = this.state.btStartIsDisabled;
            let disableStyle = isDisabled ? styles.btDisable : {};
            let isShow = this.state.isShowStartStop;

            if(isShow)
            {
                return (
                    <TouchableHighlight
                        disabled={isDisabled}
                        onPress={this.startTimer.bind(this)}
                        style={[styles.bt, disableStyle]}
                        underlayColor='gray'
                    >
                        <Text>Start</Text>
                    </TouchableHighlight>
                );
            }
        }
    }
    renderButtonStop(){
        if(this.props.isBtns != false)
        {
            let isDisabled = this.state.btStopIsDisabled;
            let disableStyle = isDisabled ? styles.btDisable : {};
            let isShow = this.state.isShowStartStop;

            if(isShow)
            {
                return (
                    <TouchableHighlight
                        disabled={isDisabled}
                        onPress={this.manualStopTimer.bind(this)}
                        style={[styles.bt, disableStyle]}
                        underlayColor='gray'
                    >
                        <Text>Stop</Text>
                    </TouchableHighlight>
                );
            }
        }
    }
    renderButtonReset(){
        if(this.props.isBtns != false)
        {
            let isShow = this.state.isShowReset;

            if(isShow)
            {
                return (
                    <TouchableHighlight
                        onPress={this.resetTimer.bind(this, this.props.timer)}
                        style={[styles.bt]}
                        underlayColor='gray'
                    >
                        <Text>Reset</Text>
                    </TouchableHighlight>
                );
            }
        }
    }
    renderTime(time){
        let t = time;
        let m = Math.floor(t / 60);
        let s = t - (m * 60);
        let minutes = m > 9 ? m : '0'+ m;
        let seconds = s > 9 ? s : '0'+ s;
        return(
            <View style={styles.row}>
                <Text style={styles.timerText}>
                    {minutes}
                </Text>
                <Text style={styles.timerText}>
                    :
                </Text>
                <Text style={styles.timerText}>
                    {seconds}
                </Text>
            </View>
        );
    }
    render() {
        let renderStart = this.renderButtonStart();
        let renderStop = this.renderButtonStop();
        let renderReset = this.renderButtonReset();
        let renderTime = this.renderTime(this.props.timer);

        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.timerContainer}>
                        {renderTime}
                    </View>
                </View>
                <View style={[styles.row]}>
                    {renderStart}
                    {renderStop}
                    {renderReset}
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    row:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    timerContainer:{
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 100,
        height: 100,
        backgroundColor:'#000'
    },
    timerTextCont:{
    },
    timerText:{
        color:'#ffffff',
        fontSize: 30
    },
    bt:{
        backgroundColor:'#ffffff',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btDisable:{
        backgroundColor:'gray',
    }
});