import React, { useState } from 'react';
import {
View,
ScrollView,
KeyboardAvoidingView,
Alert,
SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import ImageInput from './components/ImageInput';
import { DatabaseConnection } from '../database/database-connection';
import MyEmailInput from './components/MyEmailInput';

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [imgRef, setImgRef] = useState('');
  let [userEmail, setUserEmail] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Por favor preencha o nome !');
      return;
    }
    // if (!userContact) {
    //   alert('Por favor preencha o contato');
    //   return;
    // }
    // if (!userAddress) {
    //   alert('Por favor preencha o endereço !');
    //   return;
    // }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_atestado (user_name, email, imgref) VALUES (?,?,?)',
        [userName, userEmail, imgRef],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário Registrado com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar o Usuário !!!');
        }
      );
    });
  };
return (
<SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>

            {/* <ImageInput /> */}

            <Mytextinput
            placeholder="Entre com o Nome"
            onChangeText={
                (userName) => setUserName(userName)
            }
            style={{ padding: 10 }}
            />

            <MyEmailInput
            placeholder="Entre com o Email"
            onChangeText={
                (userEmail) => setUserEmail(userEmail)
            }
            style={{ padding: 10 }}
            />

            <Mytextinput
            placeholder="Entre com o Nome do arquivo
            "
            onChangeText={
                (imgRef) => setImgRef(imgRef)
            }
            style={{ padding: 10 }}
            />
            
            <Mybutton title="Salvar" customClick={register_user} />
        </KeyboardAvoidingView>
        </ScrollView>
    </View>
    </View>
</SafeAreaView>
  );
};

export default RegisterUser;