import React, { useState } from 'react';
import { useEffect, useCallback, useMemo } from 'react';

import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList  } from 'react-native';

const Hero = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleNameChange = (text) => {
    setName(text);
    setIsValidName(text.trim().length > 0); // Valid name if not empty
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text)); // Validate email format
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (isValidName && isValidEmail) {
      // Process onboarding data or navigate to next screen
      console.log('Name:', name);
      console.log('Email:', email);
    } else {
      // Display validation errors or handle invalid input
      console.log('Invalid input. Please check your data.');
    }
  };
  
  // Renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={handleSubmit}
      disabled={!isValidName || !isValidEmail}
    >
      <Text style={styles.buttonTextFilter}>{item.title}</Text>
    </TouchableOpacity>
  );
  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerProfile}>
        <Image source={require('../assets/Logo.png')} style={styles.logoImageProfile} />
        <TouchableOpacity style={styles.ImageTouchProfile} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/Profile.png')} style={styles.ImageProfile} />
        </TouchableOpacity>
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

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              onChangeText={(text) => console.log('Search Query:', text)} // Handle search query change
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => console.log('Search Button Pressed')} // Handle search button press
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterButtons}>
          <Text style={styles.order_texto}>Personal Information</Text>
          <View style={styles.bodyTituloContainer2}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={!isValidName || !isValidEmail}
            >
                <Text style={styles.buttonTextFilter}>Starters</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={!isValidName || !isValidEmail}
            >
                <Text style={styles.buttonTextFilter}>Mains</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={!isValidName || !isValidEmail}
            >
                <Text style={styles.buttonTextFilter}>Desserts</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={!isValidName || !isValidEmail}
            >
                <Text style={styles.buttonTextFilter}>Drinks</Text>
            </TouchableOpacity> 
          </View>
        </View>

        <View style={styles.filterButtons}>
          <Text style={styles.order_texto}>Personal Information</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2} // Número de columnas para mostrar los elementos
          />
        </View>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerProfile: {
    flexDirection: 'row',
    width: '100%',
    height: '15%',
    paddingHorizontal: 30,
  },
  logoImageProfile: {
    width: '60%',
    height: 150,
    resizeMode: 'contain',
    marginRight: '10%',
    marginLeft: '10%',
  },
  ImageProfile: {
    width: '20%',
    height: 150,
    resizeMode: 'contain',
  },
  ImageTouchProfile: {
    width: '100%',
    height: '100%',
  },
  body: {
    width: '100%',
    height: '60%',
    marginTop: '6%',
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
  bodyTituloContainer2: {
    flexDirection: 'row',
    width: '100%', // Ocupar la mitad del ancho disponible
    height: '75%',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    color: '#fff', 
  },
  searchButton: {
    backgroundColor: '#495E57',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButtons: {
    width: '100%',
    height: '20%',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
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
    width: '20%',
    height: '50%',
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginHorizontal: 10,
  },
  buttonTextFilter:{
    color: '#495E57',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Hero;
