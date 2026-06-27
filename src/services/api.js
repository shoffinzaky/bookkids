const BASE_URL = 'https://openlibrary.org';

export async function fetchChildrenBooks() {
    try{
        const response = await fetch(`${BASE_URL}/search.json?subject=children&limit=20`);
        const data = await response.json();
        return data.docs;
    } catch (error) {
        throw new Error ('Gagal mengambil data buku.');
    }
}

export function getBookCover(coverId) {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
}