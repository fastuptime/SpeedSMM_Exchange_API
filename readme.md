# 🌐 SpeedSMM Exchange Rate API

Welcome to the **SpeedSMM Exchange Rate API**! This project provides up-to-date exchange rates for various currencies. 🚀

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)

## 💡 Introduction

The **SpeedSMM Exchange Rate API** is designed to fetch and serve exchange rate data for multiple currencies. It updates rates regularly and provides a simple interface to access the latest rates.

## ✨ Features

- 📈 Fetch exchange rates for multiple currencies.
- 🕒 Regularly updates rates using cron jobs.
- 🔒 Secure API with key validation.
- 🗃️ Stores rates in a MongoDB database.
- 🌍 Supports a wide range of currencies.

## 🛠️ Installation

To get started with the SpeedSMM Exchange Rate API, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fastuptime/SpeedSMM_Exchange_API.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd SpeedSMM_Exchange_API
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up your MongoDB connection and API key:**
   - Ensure MongoDB is running locally.
   - Update the `mongoose.connect` URL in the code if needed.
   - Replace `'YOUR_API_KEY'` with your actual API key in the middleware.

## 🚀 Usage

To run the API, use the following command:

```bash
node index.js
```

The API will be accessible at `http://localhost:3000`.

## 📡 API Endpoints

### Get all exchange rates

- **Endpoint:** `/exchange`
- **Method:** GET
- **Description:** Retrieves all exchange rates.

### Get exchange rate for a specific currency

- **Endpoint:** `/exchange/:currency`
- **Method:** GET
- **Description:** Retrieves the exchange rate for the specified currency.

## 🖥️ Screenshots

![image](https://github.com/user-attachments/assets/b54ea6fc-81cf-423b-9192-d91b7399dbe1)
![image](https://github.com/user-attachments/assets/b9943fa1-fb91-44bf-a549-fba8afb5e61e)
![image](https://github.com/user-attachments/assets/72eb9b94-1b16-42a7-87e1-ca0ab44d7904)


## 🤝 Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes. Make sure to follow our code of conduct.

## 📜 License

This project is licensed under the MIT License.
