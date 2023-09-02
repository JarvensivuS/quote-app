import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { auth, firestore, collection, addDoc } from '../firebase/Config';
import Login from './Login';
import CustomButton from '../CustomButton';

const API_KEY = 'd0wRs8jz9LHTnq65bVZ8TQ==vELjCePA0BX0SS9x';
const API_URL = 'https://api.api-ninjas.com/v1/quotes?category=';

function HomeScreen({ logged, setLogged }) {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const sidebarWidth = Math.min(Dimensions.get('window').width * 0.8, 150);
  const [quote, setQuote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('happiness');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const categories = [
    'age',
    'alone',
    'amazing',
    'architecture',
    'art',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'car',
    'change',
    'communications',
    'computers',
    'cool',
    'courage',
    'dad',
    'dating',
    'death',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'family',
    'famous',
    'fear',
    'fitness',
    'food',
  ];

  useEffect(() => {
    if (logged) {
      fetchQuote();
    }
  }, [logged, selectedCategory]);

  const handleViewSavedQuotes = () => {
    navigation.navigate('SavedQuotes');
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch(`${API_URL}${selectedCategory}`, {
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result && result[0] && result[0].quote) {
        setQuote(result[0].quote);
      } else {
        setQuote('No quote available');
      }
    } catch (error) {
      console.error('Error: ', error.message);
      setQuote('Error fetching quote');
    }
  };

  navigation.setOptions({
    title: 'Home',
    headerShown: true,
  });

  const addQuoteToFirestore = async (quote) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const quotesCollection = collection(firestore, 'quotes');
        await addDoc(quotesCollection, {
          text: quote,
          userId: user.uid,
        });
        Alert.alert('Quote saved successfully', 'Press OK to continue');
        console.log('Quote saved successfully');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  if (logged) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.sidebarButton}
          onPress={() => setSidebarVisible(!sidebarVisible)}
        >
          <Text style={styles.sidebarButtonText}>☰ </Text>
        </TouchableOpacity>
        {sidebarVisible && (
          <View style={[styles.sidebar, { width: sidebarWidth }]}>
            <View style={styles.header}>
              <Text style={styles.headerText}>CATEGORIES</Text>
            </View>
            <ScrollView style={{ maxHeight: screenHeight * 0.8 }}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryButton}
                  onPress={() => {
                    setSelectedCategory(category);
                    setSidebarVisible(false);
                  }}
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.mainContent}>
          <Text style={styles.quoteText}>{quote}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton title="GET QUOTE" onPress={fetchQuote} />
            <CustomButton title="SAVE QUOTE" onPress={() => addQuoteToFirestore(quote)} />
            <CustomButton title="VIEW SAVED QUOTES" onPress={handleViewSavedQuotes} />
          </View>
        </View>
      </View>
    );
  } else {
    return <Login setLogin={setLogged} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  sidebarButtonText: {
    fontSize: 18,
  },
  sidebar: {
    width: 200,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  scrollableContent: {
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
  },
  sidebarHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
  categoryButton: {
    marginBottom: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000000',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
