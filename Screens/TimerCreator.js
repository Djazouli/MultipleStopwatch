import React, {Component} from 'react';
import {View, Text, Button, TextInput, Picker} from 'react-native';


export default class TimerCreator extends Component {
    // If the app was bigger, I guess it would be great to think about creating a mother class 'Creator'
    // Which contain the render method, and you specify in the StopwatchCreator only a list of field
    // and type, that you need to create the stopwatch, then StopwatchCreator would be something like
    // <Creator inputs={'Title': 'Text'}/>
    // But with the small app here, it is certainly easier to hardcode the timer and Stopwatch creator

    static navigationOptions = {
        title: 'Create a timer'
    };

    constructor(props){
        super(props);
        this.state = {
            title: '',
            hours: 0,
            minutes: 10,
            seconds: 0,
        };
        const pad = function(n){ return n < 10 ? '0' + n : n; };
        const generateArray = function(n){
            return [...Array(n)].map((v, i) => (i.toString().length - 1) ? i.toString() : pad(i.toString()));
        };
        this.hoursArray = generateArray(24);
        this.minutesArray = generateArray(60);
        this.secondsArray = generateArray(60);

    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, paddingLeft: 10}}>
                        Title:
                    </Text>
                    <TextInput
                        style={{ backgroundColor: '#e8e8e8', flex: 1, fontSize: 20, paddingRight: 10}}
                        value={this.state.title}
                        onChangeText={ text => this.setState({title: text}) }
                    />
                </View>
                <View style={{flexDirection: 'row', height: 300}}>
                    <Picker
                        selectedValue={this.state.hours}
                        style={{flex:1/3}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({hours: itemValue})
                        }>
                        {this.hoursArray.map((v, i) => <Picker.Item label={v} value={i} key={i}/>)}
                    </Picker>
                    <Picker
                        selectedValue={this.state.minutes}
                        style={{flex:1/3}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({minutes: itemValue})
                        }>
                        {this.minutesArray.map((v, i) => <Picker.Item label={v} value={i} key={i}/>)}
                    </Picker>
                    <Picker
                        selectedValue={this.state.seconds}
                        style={{flex:1/3}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({seconds: itemValue})
                        }>
                        {this.secondsArray.map((v, i) => <Picker.Item label={v} value={i} key={i}/>)}
                    </Picker>
                </View>
                <Button
                    title={'Create Timer'}
                    onPress={() => {
                        this.props.navigation.state.params.createTimer(this.state.title, 1000*(this.state.seconds+60*this.state.minutes+3600*this.state.hours));
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        )
    }
}
