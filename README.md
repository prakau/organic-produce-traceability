# Blockchain-Based Traceability System for Organic Produce

This project leverages blockchain technology to build a secure and transparent traceability system for the organic produce supply chain. It enables end-to-end tracking of produce from farm to consumer, ensuring organic integrity and increasing consumer confidence.

## Features

- Immutable recording and tracking of organic certification and transport data using blockchain
- Smart contracts for secure and trusted transactions between parties
- Integration with IoT devices for real-time logging of storage conditions during transport
- QR code-based system for consumers to view the history of their produce
- Potential to capture premium for verified organic produce and reduce fraud

## Prerequisites

- Node.js and npm installed
- Truffle framework installed globally (`npm install -g truffle`)
- Ganache blockchain development environment installed
- Metamask browser extension installed

## Getting Started

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Start Ganache and configure Metamask
4. Compile and deploy the smart contracts using `truffle compile` and `truffle migrate`
5. Start the application by running `node app.js`
6. Access the application in your web browser at `http://localhost:3000`

## Usage

1. Add Produce: Fill in the produce details in the "Add Produce" form and submit
2. Add Transport Data: Fill in the transport data details in the "Add Transport Data" form and submit
3. Get Produce: Enter the produce ID in the "Get Produce" form and retrieve the produce details
4. Get Transport Data: Enter the produce ID in the "Get Transport Data" form and retrieve the transport data

## Smart Contracts

The main smart contract `OrganicProduceTraceability` is located in the `contracts` directory. It defines the structure for storing produce and transport data on the blockchain and provides functions for adding and retrieving data.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).