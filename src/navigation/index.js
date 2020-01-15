import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ContactsScreen} from '../screen/Contacts';
import {Auth} from '../screen/Auth';

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: Auth,
      navigationOptions: {
        header: null,
      },
    },
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        title: 'Contactos',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'black',
          flexGrow: 1,
          textAlign: 'center',
        },
      },
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
