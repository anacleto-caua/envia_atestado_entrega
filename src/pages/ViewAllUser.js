import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mybutton from './components/Mybutton';
import { Alert } from 'react-native-web';

const db = DatabaseConnection.getConnection();

const aprovar = (i) => {
    aproveDisaproveAtestado(true, i)

};

const reprovar = (i) => {
    aproveDisaproveAtestado(false, i)
};

let aproveDisaproveAtestado = (status, atestadoId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_atestado SET aprovado = ? WHERE user_id = ?',
        [status, atestadoId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Atestado aprovado ou nao com Sucesso !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor entre com um código de usuário válido !');
          }
        }
      );
    });
  };

let a = 0;
const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_atestado',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.user_name}</Text>

        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.email}</Text>

        <Text style={styles.textheader}>Aprovado</Text>
        <Text style={styles.textbottom}>{item.aprovado ? 'Sim' : 'Não'}</Text>

        
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Mybutton title="Aprovar" customClick={() => aprovar(item.user_id)} />
            <Mybutton title="Reprovar" customClick={() => reprovar(item.user_id)} />
            </View>
        

        
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllUser;