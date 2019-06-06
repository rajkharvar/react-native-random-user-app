import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { Feather, Entypo } from '@expo/vector-icons';

class UserProfile extends Component {
  static navigationOptions = {
    title: 'User Profile',
    headerTintColor: '#badc57',
    headerStyle: {
      backgroundColor: '#2C3335'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      cell: '',
      imageUrl: '',
      renderIt: false,
      firstText: '',
      secondText: '',
      location: ''
    };
  }
  async componentDidMount() {
    let name = this.props.navigation.getParam('name', '');
    let cell = this.props.navigation.getParam('cell', '');
    let email = this.props.navigation.getParam('email', '');
    let url = this.props.navigation.getParam('url', '');
    let dob = this.props.navigation.getParam('dob', '');
    location = this.props.navigation.getParam('location', '');
    console.log(url);
    this.setState({
      name,
      cell,
      email,
      imageUrl: url,
      firstText: 'Hi, My name is',
      secondText: name,
      location,
      dob
    });
    this.setState({ renderIt: true });
  }

  showDetails = index => {
    switch (index) {
      case 1:
        this.setState({
          firstText: 'Hi, My name is',
          secondText: this.state.name
        });
        break;
      case 2:
        this.setState({
          firstText: 'My email address is',
          secondText: this.state.email
        });
        break;
      case 3:
        this.setState({
          firstText: 'My Address is',
          secondText: this.state.location
        });
        break;
      case 4:
        this.setState({
          firstText: 'My Birthday is',
          secondText: this.state.dob.substring(0, 10)
        });
        break;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.renderIt && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                paddingTop: 20
              }}
            >
              <Image
                source={{ uri: this.state.imageUrl }}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 125,
                  borderWidth: 2,
                  borderColor: '#badc57'
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 24, color: '#badc57' }}>
                {this.state.firstText}
              </Text>
              <Text style={{ fontSize: 36, color: '#badc57' }}>
                {this.state.secondText}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => this.showDetails(1)}>
                <Feather name='user' size={40} style={{ color: '#badc57' }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDetails(2)}>
                <Entypo name='mail' size={40} style={{ color: '#badc57' }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDetails(3)}>
                <Entypo
                  name='location-pin'
                  size={40}
                  style={{ color: '#badc57' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showDetails(4)}>
                <Entypo
                  name='calendar'
                  size={40}
                  style={{ color: '#badc57' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3335'
  },
  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 20,
    flex: 1
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
