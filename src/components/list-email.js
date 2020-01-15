import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ListEmail = ({data}) => {
  if (data && data.length > 0) {
    return data.map(item => {
      return (
        <View style={styles.groupEmail}>
          <Text style={styles.labelEmail}>{item.label}</Text>
          <Text style={styles.emailStyle}>{item.email}</Text>
        </View>
      );
    });
  }
  return null;
};

const styles = StyleSheet.create({
  groupEmail: {
    fontSize: 10,
    flexDirection: 'row',
    marginVertical: 2,
  },
  labelEmail: {
    marginRight: 15,
    fontSize: 10,
  },
  emailStyle: {
    color: '#adadad',
    fontSize: 10,
  },
});
