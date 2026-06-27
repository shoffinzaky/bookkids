import { useEffect, useState } from "react";
import { 
    View, Text, TouchableOpacity,
    StyleSheet, FlatList, Image,
    TextInput, ActivityIndicator,
} from "react-native";
import { fetchChildrenBooks, getBookCover } from "../services/api";

export default function BookListScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    async function loadBooks() {
        try{
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

    if(loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#e74c3c"/>
                <Text style={styles.loadingText}>Memuat buku...</Text>
            </View>
        );
    }

    if(error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
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

            <FlatList
                data={filteredBooks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookItem}
                        onPress={() => navigation.navigate('BookDetail', {book: item})}
                    >
                        <Image
                            source={
                                getBookCover(item.cover_i)
                                ? { uri: getBookCover(item.cover_i)}
                                : { uri: 'https://via.placeholder.com/60x85?text=No+Cover' }
                            }
                            style={styles.cover}
                        />
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.bookAuthor}>
                                {item.author_name ? item.author_name[0] : 'Penulis tidak diketahui'}
                            </Text>
                            <Text style={styles.bookYear}>
                                {item.first_publish_year ? item.first_publish_year : ''}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: "#f5f5f5",
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
        color:'#e74c3c',
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
    retrytext: {
        color: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 12,
        elevation: 2,
    },
    bookItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        elevation: 2,
    },
    cover: {
        width: 60,
        height: 85,
        borderRadius: 4,
        backgroundColor: '#ddd',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    bookAuthor: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },
    bookYear: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
});