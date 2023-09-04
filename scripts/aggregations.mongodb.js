db.createCollection('books', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['bookTitle', 'pages', 'author'],
      properties: {
        bookTitle: {
          bsonType: 'string',
          description: 'Book title must be a string with lenght < 100',
          maxLength: 100
        },
        pages: {
          bsonType: 'int',
          minimum: 1
        },
        price: {
          bsonType: 'number',
          minimum: 0
        },
        author: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string'
            },
            isMale: {
              bsonType: 'bool'
            }
          }
        },
        languages: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          },
          minItems: 1,
          uniqueItems: true
        }
      }
    }
  }
});

// ['ua', 'en', 'pl', 'jp']

db.books.insertMany([
  {
    bookTitle: "First Book",
    pages: 150,
    author: {
      name: 'Test Testenko',
      isMale: true
    }
  },
  {
    bookTitle: "Second Book",
    pages: 520,
    price: 599.99,
    author: {
      name: 'Test Testenko',
      isMale: true
    },
    languages: ['ua', 'pl', 'en']
  },
]);

//

db.books.insertOne({});