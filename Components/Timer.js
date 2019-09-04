import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatMilliseconds} from '../Helpers/helpers'
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Feather';
import Sound from 'react-native-sound';

export class Timer extends Component {
    // TODO: Create mother class for stopwatch and timer
    constructor(props) {
        super(props);
        // Load at the beginning to avoid race condition with .play
        // (would even be better to load it once at the beginning of the app, if we only have one alarm sound)
        this.alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            this.alarm.setNumberOfLoops(-1);
        });
        this.state = {
            timer: setInterval(() => {
                const newString = formatMilliseconds(this.props.duration - (new Date()).getTime() + this.state.timeStarted.getTime());
                if (newString.startsWith('-') && !this.state.timeString.startsWith('-')) {
                    // Timer just expired
                    this.alarm.play();
                }
                this.setState({
                    timeString: newString,
                })
            }, 10),
            timeStarted: new Date(),
            duration: this.props.duration,
            timeString: '',
            touched: false,
            isPaused: false,
        };

        this.resume = this.resume.bind(this);
        this.pause = this.pause.bind(this);
    }

    componentWillUnmount() {
        if(typeof this.state.timer !== 'undefined'){
            clearInterval(this.state.timer);
        }
        this.alarm.stop();
        this.alarm.release();
    }

    pause() {
        clearInterval(this.state.timer);
        this.alarm.pause();
        // time left
        this.setState({
            duration: this.state.duration - (new Date()).getTime() + this.state.timeStarted.getTime(),
            isPaused: true,
            touched: false,
        })
    }

    resume() {
        this.setState({
            isPaused: false,
            timeStarted: new Date(),
            touched: false,
            timer: setInterval(() => {
                const newString = formatMilliseconds(this.state.duration - (new Date()).getTime() + this.state.timeStarted.getTime());
                if (newString.startsWith('-') && !this.state.timeString.startsWith('-')) {
                    // Timer just expired
                    this.alarm.play();
                }
                this.setState({
                    timeString: newString
                })
            }, 10),
        });
    }

    render() {
        // TODO: Should be simplified, mostly written in the mother class
        return (
            <TouchableOpacity
                onPress={() => this.setState({touched: !this.state.touched})}
                style={{borderBottomWidth: 1, borderBottomColor: 'grey', height: 75}}
            >
                <Text style={{textAlign: 'center'}}>
                    {this.props.title}
                </Text>
                { this.state.touched
                    ? <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.state.isPaused ? this.resume() : this.pause()} style={{flex: 0.25, alignItems: 'center'}}>
                            {this.state.isPaused
                                ? <IconFA name={'play'} size={30} color={'blue'}/>
                                : <IconFA name={'pause'} size={30} color={'blue'}/>
                            }
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontSize: 30, flex: 0.5}}>
                            Dismiss
                        </Text>
                        <TouchableOpacity onPress={this.props.delete} style={{flex: 0.25, alignItems: 'center'}}>
                            <IconF name={'trash'} size={30} color={'red'}/>
                        </TouchableOpacity>
                    </View>
                    : <Text style={{textAlign: 'center', fontSize: 40}}>
                        {this.state.timeString}
                    </Text>
                }
            </TouchableOpacity>
        )
    }
}

Timer.defaultProps = {
    duration: 10*60*1000,
};
