db.createCollection('books', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['bookTitle', 'pages', 'autor'],
            properties: {
                bookTitle: {
                    bsonType: 'string',
                    description: 'Book title < 100',
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
                autor: {
                    bsonType: 'object',
                    required: [ 'name' ],
                    properties: {
                        name: {
                            bsonType: 'string'
                        },
                        isMale: {
                            bsonType: 'bool'
                        }
                    }
                },
                languagues: {
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

db.createCollection('companies', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['companyName'],
            properties: {
                companyName: {
                    bsonType: 'string',
                    description: 'companyName must be no longer than < 100',
                    maxLength: 100
                },
                since: {
                    bsonType: 'int',
                    minimum: 1900
                },
                address: {
                    bsonType: 'object',
                    required: [ 'country' ],
                    properties: {
                        country: {
                            bsonType: 'string'
                        },
                        city: {
                            bsonType: 'string'
                        },
                        phoneNumber: {
                            bsonType: 'int'
                        }
                    }
                }
            }
        }
    }
});

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
  