import React, {Component} from 'react';
import {View, ScrollView, Button, FlatList} from 'react-native';
import {Stopwatch} from '../Components/Stopwatch';
import {Timer} from '../Components/Timer';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Timers'
    };
    // TODO: Create mother class for stopwatch and timer
    // TODO: Allow putting app in background
    constructor(props) {
        super(props);
        this.state = {
            stopwatches: [],
        };
        this.createStopwatch = this.createStopwatch.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
    }

    createStopwatch(title) {
        const index = this.state.stopwatches.length;
        this.setState({
            stopwatches: [...this.state.stopwatches,
                <Stopwatch
                    key={index}
                    title={title}
                    delete={() => this.deleteComponent(index)}
                />
            ]
        });
    }

    createTimer(title, milliseconds) {
        const index = this.state.stopwatches.length;
        this.setState({
            stopwatches: [...this.state.stopwatches,
                <Timer
                    key={index}
                    title={title}
                    delete={() => this.deleteComponent(index)}
                    duration={milliseconds}
                />
            ]
        });
    }

    deleteComponent(index){
        delete this.state.stopwatches[index];
        this.setState({stopwatches: [...this.state.stopwatches]});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 0.8}}>
                    {this.state.stopwatches}
                </ScrollView>
                <View style={{flex: 0.2}}>
                    <Button
                        title={'Add Stopwatch'}
                        onPress={
                            () => this.props.navigation.navigate(
                                'StopwatchCreator',
                                {createStopwatch: this.createStopwatch}
                            )
                        }
                    />
                    <Button
                        title={'Add Timer'}
                        onPress={
                            () => this.props.navigation.navigate(
                                'TimerCreator',
                                {createTimer: this.createTimer}
                            )
                        }
                    />
                </View>
            </View>
        )
    }
}
