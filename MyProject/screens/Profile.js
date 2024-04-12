import React, { useState } from 'react';
import { useEffect, useCallback, useMemo } from 'react';

import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from './database';

const Profile = ({ navigation }) => {

  const [jsondata, setJsondata] = useState({
    item: {
      name: "",
      email: "",
      phone: "00000000",
      prefemail: false,
      prefphone: false,
      preftext: false,
      prefmail: false
    }
  });
  
  const [newname, setName] = useState('');
  const [newemail, setEmail] = useState('');
  const [newphone, setPhone] = useState('');
  const [newprefEmail, setPrefEmail] = useState(jsondata.item.prefemail);
  const [newprefPhone, setPrefPhone] = useState(jsondata.item.prefphone);
  const [newprefText, setPrefText] = useState(jsondata.item.preftext);
  const [newprefMail, setPrefMail] = useState(jsondata.item.prefmail);
  
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const firstItem = await getMenuItems();
        if (firstItem.length > 0) {
          setJsondata({
            item: {
              name: firstItem[0].name,
              email: firstItem[0].email,
              phone: firstItem[0].phone,
              prefemail: firstItem[0].prefemail,
              prefphone: firstItem[0].prefphone,
              preftext: firstItem[0].preftext,
              prefmail: firstItem[0].prefmail
            }
          });
          setName(firstItem[0].name)
          setEmail(firstItem[0].email)
          setPhone(firstItem[0].phone)
          setPrefEmail(firstItem[0].prefemail)
          setPrefPhone(firstItem[0].prefphone)
          setPrefText(firstItem[0].preftext)
          setPrefMail(firstItem[0].prefmail)
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
  
    fetchMenuItems();
  }, []);
  

  useEffect(() => {
    if (isValidName && isValidEmail) {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          name: newname,
        }
      }));
    }
  }, [newname]);

  useEffect(() => {
    if (isValidName && isValidEmail) {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          email: newemail,
        }
      }));
    }
  }, [newemail]);

  useEffect(() => {
    if (isValidName && isValidEmail) {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          phone: newphone,
        }
      }));
    }
  }, [newphone]);

  useEffect(() => {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          prefemail: newprefEmail,
        }
      }));
    
      console.log('gggggggggggggggggggggggggg')
      console.log(jsondata.item.prefemail)

  }, [newprefEmail]);

  useEffect(() => {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          prefphone: newprefPhone,
        }
      }));
    
  }, [newprefPhone]);

  useEffect(() => {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          preftext: newprefText,
        }
      }));
    
  }, [newprefText]);

  useEffect(() => {
      // Actualizar los datos de jsondata con name y email
      setJsondata((prevData) => ({
        item: {
          ...prevData.item,
          prefmail: newprefMail
        }
      }));
    
  }, [newprefMail]);



  const handleNameChange = (text) => {
    setName(text);
    console.log(newname)
    setIsValidName(text.trim().length > 0); // Valid name if not empty
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text)); // Validate email format
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handlenewprefEmail = (text) => {
    setPrefEmail(text);
  };
  const handlenewprefPhone = (text) => {
    setPrefPhone(text);
  };
  const handlenewprefText = (text) => {
    setPrefText(text);
  };
  const handlenewprefMail = (text) => {
    setPrefMail(text);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (isValidName && isValidEmail) {
      // Actualizar los datos de jsondata con name y email
      setJsondata({
        item: {
          name: newname,
          email: newemail,
          phone: newphone,
          prefemail: newprefEmail,
          prefphone: newprefPhone,
          preftext: newprefText,
          prefmail: newprefMail
        }
      });
      console.log('++++++++++++++++++++++++++++++++++++++++++'); // Added console.log for updated JSON data

      console.log('a enviar', jsondata, newprefEmail); // Added console.log for updated JSON data

      // Guardar los datos actualizados en la tabla
      saveMenuItems(jsondata);
    } else {
      // Display validation errors or handle invalid input
      console.log('Invalid input. Please check your data.');
    }
  };

  return (
    <ScrollView style={styles.containerProfile}>
      <View style={styles.headerProfile}>
        <Image source={require('../assets/Logo.png')} style={styles.logoImageProfile} />
        <Image source={require('../assets/Profile.png')} style={styles.ImageProfile} />
      </View>

      <View style={styles.body}>

        <Text style={styles.titulo_texto}>Personal Information</Text>
        <Text style={styles.titulo_texto}>Avatar</Text>

        <View style={styles.bodyTituloContainer}>
          <Image source={require('../assets/Profile.png')} style={styles.ImageProfile2} />
          <TouchableOpacity
            style={styles.buttonStyle1}
            onPress={handleSubmit}
            disabled={!isValidName || !isValidEmail}
          >
              <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.buttonStyle2}
            onPress={handleSubmit}
            disabled={!isValidName || !isValidEmail}
          >
              <Text style={styles.buttonText2}>Remove</Text>
          </TouchableOpacity> 
        </View>


        <Text style={styles.logoText}>Name</Text>
        <TextInput
        style={[styles.input, !isValidName && styles.inputError]}
        placeholder= {jsondata.item.name}
        value={newname}
        onChangeText={handleNameChange}
        />

        <Text style={styles.logoText}>Email</Text>
        <TextInput
        style={[styles.input, !isValidEmail && styles.inputError]}
        placeholder={jsondata.item.email}
        value={newemail}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        />

        <Text style={styles.logoText}>Phone</Text>
        <TextInput
          style={[styles.input, !isValidEmail && styles.inputError]}
          placeholder={jsondata.item.phone}
          value={newphone} // Usar la variable 'phone' para el valor del TextInput
          onChangeText={handlePhoneChange} // Llamar a la función 'handlePhoneChange' en el cambio de texto
          keyboardType="phone-pad" // Mantener el teclado como phone-pad para números de teléfono
          autoCapitalize="none"
        />

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxTitle}>Contact Preferences</Text>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={newprefEmail}
              onPress={() => handlenewprefEmail(!jsondata.item.prefemail)}
            />
            <Text>Email{newprefEmail}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={newprefPhone}
              onPress={() => handlenewprefPhone(!jsondata.item.prefphone)}
            />
            <Text>Phone{newprefPhone}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={newprefText}
              onPress={() => handlenewprefText(!jsondata.item.preftext)}
            />
            <Text>Text Message{newprefText}</Text>
          </View>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={newprefMail}
              onPress={() => handlenewprefMail(!jsondata.item.prefmail)}
            />
            <Text>Mail{newprefMail}</Text>
          </View>
        </View>


        <TouchableOpacity
            style={styles.buttonStyle3}
            onPress={handleSubmit}
            disabled={!isValidName || !isValidEmail}
          >
              <Text style={styles.buttonText3}>Log Out</Text>
        </TouchableOpacity> 

        <View style={styles.bodyTituloContainer}>
          <TouchableOpacity
            style={styles.buttonStyle4}
          >
              <Text style={styles.buttonText2}>Discard Changes</Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.buttonStyle5}
            onPress={() => {
              handleSubmit(); // Llama a la función handleSubmit
              navigation.navigate('Hero'); // Navega al componente Hero
            }}
          >
              <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity> 
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerProfile: {
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
  body: {
    width: '100%',
    height: '40%',
    paddingHorizontal: 15,
  },
  bodyTituloContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    width: '100%', // Ocupar la mitad del ancho disponible
    height: '20%',
  },
  titulo_texto: {
    fontSize: 20,
    alignSelf: 'flex-start', // Align to the left side
    fontWeight: 'bold',
  },
  logoText: {
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: '5%',
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
  ImageProfile2: {
    width: '30%',
    height: '100%',
    resizeMode: 'contain',
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
  buttonStyle1:{
    marginTop: '5%',
    marginRight: '5%',
    width: '25%',
    height: '60%',
    backgroundColor: '#495E57',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2:{
    marginTop: '5%',
    width: '25%',
    height: '60%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#495E57',
  },
  buttonStyle3:{
    marginTop: '5%',
    marginLeft: '10%',
    width: '80%',
    height: '10%',
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C1A000',
  },
  buttonStyle4:{
    marginBottom: '10%',
    marginRight: '5%',
    width: '45%',
    height: '60%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#495E57',
  },
  buttonStyle5:{
    width: '45%',
    height: '60%',
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
  buttonText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },
  buttonText3: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxRow:{
    flexDirection: 'row',
  },
});

export default Profile;
