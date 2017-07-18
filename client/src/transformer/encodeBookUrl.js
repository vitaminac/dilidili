import { b64EncodeUnicode } from "../utils/b64";

export default function encodeBookUrl(books$) {
    return books$.distinct((book) => book.url).map((book) => {
        book.url = b64EncodeUnicode(book.url) + "/";
        return book;
    });
}
