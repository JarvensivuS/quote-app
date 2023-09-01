import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { auth, firestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from '../firebase/Config';
import CustomButton from '../CustomButton';

const SavedQuotes = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  const fetchSavedQuotes = async () => {
    try {
      const quotesCollection = collection(firestore, 'quotes');
      const q = query(quotesCollection);
      const querySnapshot = await getDocs(q);
      const savedQuotesData = querySnapshot.docs.map((doc) => doc.data().text);
  
      setSavedQuotes(savedQuotesData);
  
      console.log('Saved quotes retrieved:', savedQuotesData);
    } catch (error) {
      console.error('Error fetching saved quotes:', error);
    }
  };
  
  const handleDeleteQuote = async (quoteText) => {
    try {
      const quotesCollection = collection(firestore, 'quotes');
      const querySnapshot = await getDocs(quotesCollection);
      const docToDelete = querySnapshot.docs.find(doc => doc.data().text === quoteText);

      if (docToDelete) {
        await deleteDoc(docToDelete.ref);
        await fetchSavedQuotes();
        console.log('Quote deleted successfully');
      } else {
        console.log('Quote not found');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={savedQuotes}
        renderItem={({ item }) => (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{item}</Text>
            <CustomButton title="Delete" onPress={() => handleDeleteQuote(item)}/>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quoteText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SavedQuotes;
