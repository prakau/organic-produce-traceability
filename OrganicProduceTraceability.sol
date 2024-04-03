// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganicProduceTraceability {
    struct Produce {
        uint256 id;
        string name;
        string farm;
        uint256 harvestDate;
        bool isOrganic;
        string[] certifications;
    }

    struct TransportData {
        uint256 produceId;
        uint256 timestamp;
        string location;
        string temperature;
        string humidity;
    }

    mapping(uint256 => Produce) public produces;
    mapping(uint256 => TransportData[]) public transportData;
    uint256 public produceCount;

    event ProduceAdded(uint256 indexed id, string name, string farm, uint256 harvestDate, bool isOrganic);
    event TransportDataAdded(uint256 indexed produceId, uint256 timestamp, string location, string temperature, string humidity);

    function addProduce(string memory _name, string memory _farm, uint256 _harvestDate, bool _isOrganic, string[] memory _certifications) public {
        produceCount++;
        produces[produceCount] = Produce(produceCount, _name, _farm, _harvestDate, _isOrganic, _certifications);
        emit ProduceAdded(produceCount, _name, _farm, _harvestDate, _isOrganic);
    }

    function addTransportData(uint256 _produceId, uint256 _timestamp, string memory _location, string memory _temperature, string memory _humidity) public {
        require(_produceId <= produceCount, "Invalid produce ID");
        transportData[_produceId].push(TransportData(_produceId, _timestamp, _location, _temperature, _humidity));
        emit TransportDataAdded(_produceId, _timestamp, _location, _temperature, _humidity);
    }

    function getProduceById(uint256 _id) public view returns (uint256, string memory, string memory, uint256, bool, string[] memory) {
        require(_id <= produceCount, "Invalid produce ID");
        Produce memory p = produces[_id];
        return (p.id, p.name, p.farm, p.harvestDate, p.isOrganic, p.certifications);
    }

    function getTransportDataByProduceId(uint256 _produceId) public view returns (TransportData[] memory) {
        require(_produceId <= produceCount, "Invalid produce ID");
        return transportData[_produceId];
    }
}