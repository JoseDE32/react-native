import React, { useState } from 'react';
import { useEffect, useCallback, useMemo } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from './database';
import { getSectionListData, useUpdateEffect } from './utils';

const Onboarding = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);


  const jsondata = {
    "item": {
      "name": "",
      "email": "",
      "phone": "00000000",
      "prefemail": true,
      "prefphone": true,
      "preftext": false,
      "prefmail": false
    }
  }

  const handleNameChange = (text) => {
    setName(text);
    setIsValidName(text.trim().length > 0); // Valid name if not empty
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text)); // Validate email format
  };


  useEffect(() => {
    (async () => {
      try {
        await createTable();
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  





  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSubmit = () => {
    if (isValidName && isValidEmail) {
      // Actualizar los datos de jsondata con name y email
      const updatedJsonData = { ...jsondata }; // Copia de jsondata
      updatedJsonData.item.name = name;
      updatedJsonData.item.email = email;
      // Aquí puedes actualizar otros campos de jsondata si es necesario

      // Guardar los datos actualizados en la tabla
      saveMenuItems(updatedJsonData);
    } else {
      // Display validation errors or handle invalid input
      console.log('Invalid input. Please check your data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
      </View>

      <View style={styles.body}>
        <View style={styles.body_green}>

          <Text style={styles.titulo_texto}>Little Lemon</Text>
          
          <View style={styles.bodyTituloContainer}>
            <View style={styles.bodyTextContainer}>
              <Text style={styles.subtitulo_texto}>Chicago</Text>
              <Text style={styles.descripcion_texto}>We are a family 
              owned Mediterranean restaurant, 
              focused on traditional 
              recipes served with a modern twist.</Text>   
            </View>
            <Image source={require('../assets/Hero image.png')} style={styles.logoImageHero} />       
          </View>

        </View>

        <Text style={styles.logoText}>Name</Text>
        <TextInput
        style={[styles.input, !isValidName && styles.inputError]}
        placeholder="Enter your name"
        value={name}
        onChangeText={handleNameChange}
        />

        <Text style={styles.logoText}>Email</Text>
        <TextInput
        style={[styles.input, !isValidEmail && styles.inputError]}
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        <TouchableOpacity
            onPress={() => {
              handleSubmit(); // Llama a la función handleSubmit
              navigation.navigate('Hero'); // Navega al componente Hero
            }}
            style={styles.buttonStyle}
            disabled={!isValidName || !isValidEmail}
        >
            <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    height: '20%'
  },
  body: {
    width: '100%',
    height: '60%'
  },
  body_green: {
    backgroundColor: '#495E57',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingBottom: 15,
  },
  bodyTituloContainer: {
    flexDirection: 'row',
    width: '50%', // Ocupar la mitad del ancho disponible
  },
  bodyTextContainer: {
    width: '100%', // Ocupar la mitad del ancho disponible
  },
  titulo_texto: {
    fontSize: 54,
    alignSelf: 'flex-start', // Align to the left side
    color: '#F4CE14',
    paddingLeft: 15,
  },
  subtitulo_texto: {
    fontSize: 32,
    alignSelf: 'flex-start', // Align to the left side
    color: '#fff',
    paddingLeft: 15,
  },
  descripcion_texto: {
    fontSize: 16,
    alignSelf: 'flex-start', // Align to the left side
    color: '#fff',
    paddingLeft: 15,
  },
  logoText: {
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: '5%',
  },
  logoImage: {
    width:300,
    height: 150,
    resizeMode: 'contain',
  },
  logoImageHero: {
    width: 150,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 40,
    marginTop: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark grayish text color
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start', // Align to the left side
    marginBottom: 5,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: '5%',
  },
  inputError: {
    borderColor: 'red',
  },
  buttonContainer: {
    backgroundColor: '#e0e0e0', // Fondo ligeramente más oscuro que el principal
    width: '100%',
    paddingHorizontal: 20, // Padding horizontal
    paddingVertical: 20, // Padding vertical
    height : '20%'
  },
  buttonStyle:{
    marginTop: '10%',
    marginLeft: '10%',
    width: '25%',
    height: '10%',
    backgroundColor: '#495E57',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding;
