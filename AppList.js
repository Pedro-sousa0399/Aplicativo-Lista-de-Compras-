import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView , Image} from 'react-native';
import AppItem from './AppItens';
import Database from './BancoDeDados';
import Logo2 from './Logo2.png'
 
export default function AppList({ route, navigation }) {
    const [items, setItems] = useState([]);
  
  useEffect(() => {
      Database.getItems().then(items => setItems(items));
  }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.logo} source ={Logo2}></Image>
            <Text style={styles.title}>Lista de Compras</Text>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                { items.map(item => {
                    return <AppItem key={item.id} id={item.id} item={item.quantidade + '  de ' + item.descricao} navigation={navigation} />
                }) }
            </ScrollView>
        </View>
        );
  
}
 
const styles = StyleSheet.create({
  logo:{
    marginTop: 90,  
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
      justifyContent:"center"
    },
    scrollContainer: {
      flex: 1,
      width: '90%'
    },
    itemsContainer: {
      flex: 1,
      height:"50%",
      marginTop: 10,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff',
    
    },
  });