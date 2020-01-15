import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {ListPhoneNumber} from '../components/list-phone-number';
import {ListEmail} from '../components/list-email';
type Props = {};

export class ContactsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      contacts: [],
      searchPlaceholder: 'Search',
      styleCard: styles.card,
    };
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        this.setState({contacts});
      }
    });

    Contacts.getCount(count => {
      this.setState({searchPlaceholder: `Search ${count} contacts`});
    });
  };

  search = text => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        this.setState({contacts});
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Dividir gastos</Text>
        <TextInput
          style={styles.textInput}
          placeholder={this.state.searchPlaceholder}
          onChangeText={this.search}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {this.state.contacts &&
              this.state.contacts.map(item => {
                return (
                  <TouchableOpacity
                    style={this.state.styleCard}
                    key={item.recordID}
                    onPress={() => {
                      this.setState({
                        styleCard: styles.cardSelect,
                      });
                      // navigate('Details', {
                      //   name: launch.name,
                      //   jobs: launch.jobs,
                      // });
                    }}>
                    <View style={styles.iconName}>
                      <Text>
                        {`${item.givenName.charAt(0).toUpperCase()}`}
                        <Text>{`${item.familyName
                          .charAt(0)
                          .toUpperCase()}`}</Text>
                      </Text>
                    </View>
                    <View style={styles.groupInfo}>
                      <Text style={styles.fullName}>
                        {`${item.givenName}  ${item.familyName}`}
                      </Text>
                      <ListPhoneNumber data={item.phoneNumbers} />
                      <ListEmail data={item.emailAddresses} />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconName: {
    backgroundColor: '#90EE90',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    marginHorizontal: 20,
  },
  groupInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  scrollView: {
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  body: {
    backgroundColor: '#F5FFFA',
  },
  title: {
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 30,
    fontWeight: '400',
  },
  fullName: {
    fontSize: 14,
    paddingVertical: 10,
  },
});
