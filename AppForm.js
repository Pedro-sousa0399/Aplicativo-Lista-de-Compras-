import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import Database from './BancoDeDados';
import logo from './logo.png'
import { FontAwesome } from '@expo/vector-icons'; 


export default function AppForm({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [descricao, setDescricao] = useState(''); 
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    if(!route.params) return;
    setDescricao(route.params.descricao);
    setQuantidade(route.params.quantidade.toString());
  }, [route])

    
    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    function handleButtonPress(){ 
      console.log({id: new Date().getTime(), descricao, quantidade}); 
      navigation.navigate("AppList");
    }

    async function handleButtonPress(){ 
      const listItem = {descricao, quantidade: parseInt(quantidade)};
      Database.saveItem(listItem, id)
        .then(response => navigation.navigate("AppList", listItem));
    }
      
      
     
    

  return (


    <View style={styles.container}>
    
    <Image style={styles.logo} source ={logo}></Image>

    <Text style={styles.title}>Item para comprar</Text>
 
      <View style={styles.inputContainer}> 
      <TextInput 
          style={styles.input} 
          onChangeText={handleDescriptionChange} 
          placeholder="Digite o item "
          clearButtonMode="always"
          value={descricao} /> 
      <TextInput 
          style={styles.input} 
          onChangeText={handleQuantityChange} 
          placeholder="Quantidade" 
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidade.toString()} /> 
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
          
           
          <FontAwesome  name="save" size={30} color="white" />
          <Text style={styles.buttonText}> Salvar</Text>

  


        </TouchableOpacity> 
       

      </View>
      
      <StatusBar style="light" />
    </View>

    
    

  );

}





const styles = StyleSheet.create({

    logo:{
      
      width: 100,
      height: 100,
    },



    container: {
      flex: 1,
      backgroundColor: '#81BEF7',
      alignItems: 'center',
      justifyContent:"center"
    },
    title: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical:20,
    },
    inputContainer: {
      
      marginTop: 30,
      width:'90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopEndRadius:10,
      borderTopStartRadius:10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#81BEF7',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
      justifyContent:'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
  });
