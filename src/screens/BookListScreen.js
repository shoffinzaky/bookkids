import { useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity,
  StyleSheet, FlatList,
  TextInput, ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchChildrenBooks } from "../services/api";
import BookCard from "../components/BookCard";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadBooks();
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      console.log('Gagal load favorit', err);
    }
  }

  async function toggleFavorite(book) {
    try {
      const isFav = favorites.some(fav => fav.key === book.key);
      let updated;
      if (isFav) {
        updated = favorites.filter(fav => fav.key !== book.key);
      } else {
        updated = [...favorites, book];
      }
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (err) {
      console.log('Gagal simpan favorit', err);
    }
  }

  async function loadBooks() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchChildrenBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Memuat buku...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>😢 {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBooks}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari judul buku..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.favPageButton}
        onPress={() => navigation.navigate('Favorite')}
      >
        <Text style={styles.favPageText}>❤️ Favorit Saya ({favorites.length})</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some(fav => fav.key === item.key)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#888',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    elevation: 2,
  },
  favPageButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  favPageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});