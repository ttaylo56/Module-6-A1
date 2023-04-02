
# Bank API
This is a RESTful API for a bank that allows you to manage bank accounts.


## Getting Started
1. Clone the repository:
```
git clone https://github.com/your-username/bank-api.git
```

2. Run `npm install` to install the dependencies.
3. Create a ```.env``` file and add your databaseURL and port number:
```
DATABASE_URL=mongodb://localhost:27017/bank
PORT=3000
```

4. Start the server with `npm start`.


## API Endpoints
#### Create a Bank Account
```
POST /accounts
```
Create a new bank account. Required fields:

```accountNumber``` (string length 8)

```balance``` (number)

```owner.name``` (string)

```owner.email``` (string, email format)

```type``` (string, either "checking", "savings", or "credit")


Example request:

```{
  "accountNumber": "12345678",
  "balance": 1000,
  "owner": {
    "name": "John Smith",
    "email": "john.smith@example.com"
  },
  "type": "checking"
}
```

#### Get all Bank Accounts

```
GET /accounts
```

Get a list of all bank accounts.

#### Get a Bank Account

```
GET /accounts/:id
```

Get a specific account by ID.

#### Update a Bank Account

```
PUT /accounts/:id
```

Update an existing account by ID. Required fields:

```balance``` (number)

```owner.name``` (string)

```owner.email``` (string, email format)

```type``` (string, either "checking", "savings", or "credit")

Example request:

```{
  "balance": 2000,
  "owner": {
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  },
  "type": "savings"
}
```

#### Delete a Bank Account

```
DELETE /acounts/:id
```

### Error Handling

If any validation errors occur when creating or updating a bank account, the API will return a ```400 Bad Request``` error with an array of error messages in the response body.

If a bank account with the specified ID does not exist when getting, updating, or deleting a bank account, the API will return a ```404 Not Found``` error with an error message in the response body.

If any other error occurs while processing a request, the API will return a ```500 Internal Server Error``` with an error message in the response body.

### Built with

* Node.js
* Express
* MongoDB
* Mongoose