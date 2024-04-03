const express = require('express');
const Web3 = require('web3');
const contract = require('truffle-contract');
const OrganicProduceTraceability = require('./build/contracts/OrganicProduceTraceability.json');

const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

app.use(express.json());

let organicProduceTraceability = null;

app.post('/produce', async (req, res) => {
    const { name, farm, harvestDate, isOrganic, certifications } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        organicProduceTraceability = await contract(OrganicProduceTraceability).deployed();

        await organicProduceTraceability.addProduce(name, farm, harvestDate, isOrganic, certifications, { from: accounts[0] });

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.post('/transport-data', async (req, res) => {
    const { produceId, timestamp, location, temperature, humidity } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        organicProduceTraceability = await contract(OrganicProduceTraceability).deployed();

        await organicProduceTraceability.addTransportData(produceId, timestamp, location, temperature, humidity, { from: accounts[0] });

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/produce/:id', async (req, res) => {
    const produceId = req.params.id;

    try {
        organicProduceTraceability = await contract(OrganicProduceTraceability).deployed();

        const produce = await organicProduceTraceability.getProduceById(produceId);

        res.json({
            id: produce[0].toNumber(),
            name: produce[1],
            farm: produce[2],
            harvestDate: produce[3].toNumber(),
            isOrganic: produce[4],
            certifications: produce[5]
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/transport-data/:id', async (req, res) => {
    const produceId = req.params.id;

    try {
        organicProduceTraceability = await contract(OrganicProduceTraceability).deployed();

        const transportDataArray = await organicProduceTraceability.getTransportDataByProduceId(produceId);

        const transportData = transportDataArray.map(data => ({
            produceId: data.produceId.toNumber(),
            timestamp: data.timestamp.toNumber(),
            location: data.location,
            temperature: data.temperature,
            humidity: data.humidity
        }));

        res.json(transportData);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});