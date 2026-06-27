import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getBookCover } from "../services/api";

export default function BookCard({ book, onPress, onToggleFavorite, isFavorite }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          getBookCover(book.cover_i)
            ? { uri: getBookCover(book.cover_i) }
            : { uri: 'https://via.placeholder.com/60x85?text=No+Cover' }
        }
        style={styles.cover}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author}>
          {book.author_name ? book.author_name[0] : 'Penulis tidak diketahui'}
        </Text>
        <Text style={styles.year}>
          {book.first_publish_year ? book.first_publish_year : ''}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.favButton}
        onPress={() => onToggleFavorite(book)}
      >
        <Text style={styles.favIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  cover: {
    width: 60,
    height: 85,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  author: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  year: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  favButton: {
    padding: 8,
  },
  favIcon: {
    fontSize: 22,
  },
});