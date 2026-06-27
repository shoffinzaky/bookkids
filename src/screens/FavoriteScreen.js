import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList,
  StyleSheet, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BookCard from '../components/BookCard';

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) setFavorites(JSON.parse(stored));
      else setFavorites([]);
    } catch (err) {
      console.log('Gagal load favorit:', err);
    }
  }

  async function removeFavorite(book) {
    try {
      const updated = favorites.filter(fav => fav.key !== book.key);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (err) {
      console.log('Gagal hapus favorit:', err);
    }
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>📚</Text>
        <Text style={styles.emptyText}>Belum ada buku favorit</Text>
        <Text style={styles.emptySubtext}>Tap ❤️ di daftar buku untuk menambahkan</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('BookList')}
        >
          <Text style={styles.backButtonText}>Lihat Daftar Buku</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{favorites.length} buku favorit</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
            onToggleFavorite={removeFavorite}
            isFavorite={true}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  count: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
});