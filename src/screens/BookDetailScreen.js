import { View, Text, Image,StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getBookCover } from "../services/api";

export default function BookDetailScreen({ route, navigation }) {
    const { book } = route.params;

    return(
        <ScrollView style={styles.container}>
            {/* Cover Buku */}
            <View style={styles.coverContainer}>
                <Image
                    source={
                        getBookCover(book.cover_i)
                        ? { uri: getBookCover(book.cover_i) }
                        : { uri: 'https://via.placeholder.com/150x200?text=No+Cover' }
                    }
                    style={styles.cover}
                />
            </View>

            {/* Info Buku */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.label}>Penulis</Text>
                <Text style={styles.value}>
                    {book.author_name ? book.author_name.join(',') : 'Tidak diketahui'}
                </Text>

                <Text style={styles.label}>Tahun Terbit</Text>
                <Text style={styles.value}>
                    {book.first_publish_year ?? 'Tidak diketahui'}
                </Text>

                <Text style={styles.label}>Bahasa</Text>
                <Text style={styles.value}>
                    {book.language ? book.language.join(',') : 'Tidak diketahui'}
                </Text>

                <Text style={styles.label}>Jumlah Edisi</Text>
                <Text style={styles.value}>
                    {book.edition_count ?? 'Tidak diketahui'}
                </Text>

                <Text style={styles.label}>Bisa Dibaca Online</Text>
                <Text style={styles.value}>
                    {book.has_fulltext ? 'Ya, tersedia online' : 'Tidak tersedia'}
                </Text>

                <Text style={styles.label}>Akses Ebook</Text>
                <Text style={styles.value}>
                    {book.ebook_access === 'public' ? "Gratis" : 
                    book.ebook_access === 'borrowable' ? 'Bisa dipinjam' : 'Tidak tersedia'}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    coverContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 24,
    },
    cover: {
        width : 150,
        height : 200,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    infoContainer: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 16,
        textAlign: 'center',
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#888',
        marginTop : 12,
        textTransform: 'uppercase',    
    },
    value: {
        fontSize: 15,
        color: '#333',
        marginTop: 4,
    },
});