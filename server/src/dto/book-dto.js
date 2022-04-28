module.exports = class BookDto {
    title;
    year;
    author;
    pages;
    have;

    constructor(data) {
        this.title = data.title;
        this.year = data.year;
        this.author = data.author;
        this.pages = data.pages;
        this.have = data.have;
    }
}