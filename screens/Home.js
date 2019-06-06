import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  Image,
  ActivityIndicator
} from 'react-native';
import { Button, Card } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      search: '',
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchUserFromAPi();
  }

  fetchUserFromAPi = () => {
    axios
      .get('https://randomuser.me/api/?results=50')
      .then(response => {
        this.setState({ usersData: response.data.results, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _keyExtractor = (dataSource, index) => dataSource.email;

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2C3335'
          }}
        >
          <ActivityIndicator size='large' color='#badc57' />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={{ backgroundColor: '#2C3335' }} />
          <TextInput
            placeholder='Search'
            placeholderTextColor='#badc57'
            style={{
              backgroundColor: '#2C3335',
              color: '#badc57',
              height: 50,
              fontSize: 18,
              paddingLeft: 20
            }}
            onChangeText={search => this.setState({ search })}
            placeholder='For E.g John Doe'
          />
          <ScrollView>
            <FlatList
              data={this.state.usersData}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('UserProfile', {
                      name: item.name.first + ' ' + item.name.last,
                      email: item.email,
                      url: item.picture.large,
                      cell: item.cell,
                      dob: item.dob.date,
                      location: item.location.city + ', ' + item.location.state
                    })
                  }
                >
                  <Card style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                      source={{ uri: item.picture.medium }}
                    />
                    <View style={{ flexDirection: 'column', paddingLeft: 12 }}>
                      <Text style={{ fontSize: 24 }}>
                        {item.name.first} {item.name.last}
                      </Text>
                      <Text style={{ fontSize: 18 }}>{item.phone}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
