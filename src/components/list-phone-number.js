import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ListPhoneNumber = ({data}) => {
  if (data && data.length > 0) {
    return data.map(item => {
      return (
        <View style={styles.groupPhoneNumber} key={item.number}>
          <Text style={styles.title}>{item.label}</Text>
          <Text style={styles.subTitle}>{item.number}</Text>
        </View>
      );
    });
  }
};

const styles = StyleSheet.create({
  groupPhoneNumber: {
    fontSize: 10,
    flexDirection: 'row',
    marginVertical: 2,
  },
  title: {
    fontSize: 10,
    marginRight: 15,
  },
  subTitle: {
    color: '#adadad',
    fontSize: 10,
  },
});
