import React, {Component} from 'react';
import {View, Button, TextInput, Text} from 'react-native';


export default class StopwatchCreator extends Component {
    // If the app was bigger, I guess it would be great to think about creating a mother class 'Creator'
    // Which contain the render method, and you specify in the StopwatchCreator only a list of field
    // and type, that you need to create the stopwatch, then StopwatchCreator would be something like
    // <Creator inputs={'Title': 'Text'}/>
    // But with the small app here, it is certainly easier to hardcode the timer and Stopwatch creator

    static navigationOptions = {
        title: 'Create a stopwatch'
    };

    constructor(props){
        super(props);
        this.state = {
            title: '',
        };
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
                <Button
                    title={'Create Stopwatch'}
                    onPress={() => {
                        this.props.navigation.state.params.createStopwatch(this.state.title);
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        )
    }
}
