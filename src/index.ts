const express = require('express')
const app = express();
const fs = require('fs')

app.use(express.json());

const booksData: any[] = JSON.parse(fs.readFileSync('books.json', 'utf8'));

app.get('/books', (req: any, res: any) => {
    try {
      res.json(booksData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.get('/books/v1', (req: any, res: any) => {
    try {
        const query = req.query.search as string;

        if (!query) {
            res.status(400).json({ error: 'Query parameter "search" is required.' });
            return;
        }

        const matchingBooks = booksData.filter((book) =>
            book.name.toLowerCase().startsWith(query.toLowerCase())
        );

        res.json(matchingBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
