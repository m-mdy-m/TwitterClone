# Twitter Clone

This is a simple Twitter clone project built with vanilla JavaScript for the frontend and Node.js for the backend. It utilizes MongoDB as the database for storing tweets.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your system:

- Node.js
- MongoDB

### Installing

1. Clone the repository to your local machine:

```
git clone https://github.com/m-mdy-m/NexTweet.git
```

2. Navigate to the project directory:

```
cd twitter-clone
```

3. Install dependencies:

```
npm install
```

### Setting Up MongoDB

1. Make sure MongoDB is installed and running on your system.

2. Create a new database named `twitter_clone`.

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/twitter_clone
```

### Running the Server

Start the server by running the following command:

```
npm start
```

The server will be running on port 3000 by default.

## Usage

Once the server is running, you can access the application by navigating to `http://localhost:3000` in your web browser.

## Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/m-mdy-m/NexTweet/blob/main/LICENSE) file for details.