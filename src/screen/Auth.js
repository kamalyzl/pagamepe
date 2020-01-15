import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';

type Props = {};

export class Auth extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.body}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
            }}>
            <Text h2>Bienvenido</Text>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Input
              inputStyle={styles.input}
              errorStyle={{color: 'red'}}
              label="Correo Electronico"
              labelStyle={{fontSize: 12, fontWeight: 'normal'}}
            />
            <Input
              inputStyle={styles.input}
              secureTextEntry
              errorStyle={{color: 'red'}}
              label="Contraseña"
              labelStyle={{fontSize: 12, fontWeight: 'normal', marginTop: 20}}
            />
            <View style={styles.login}>
              <Text h5>Ingresar</Text>
              <Button
                title="👍"
                buttonStyle={styles.button}
                onPress={() => this.props.navigation.navigate('Contacts')}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <Text h5 style={styles.link}>
              Crear una cuenta
            </Text>
            <Text h5 style={styles.link}>
              Olvide mi contraseña
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F5FFFA',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    flex: 1,
  },
  link: {
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#8FBC8B',
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  input: {
    fontSize: 14,
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
});
