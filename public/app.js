$(document).ready(function() {
    $('#addProduceForm').submit(function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const farm = $('#farm').val();
        const harvestDate = new Date($('#harvestDate').val()).getTime() / 1000;
        const isOrganic = $('#isOrganic').val() === 'true';
        const certifications = $('#certifications').val().split(',');

        $.ajax({
            url: '/produce',
            method: 'POST',
            data: JSON.stringify({ name, farm, harvestDate, isOrganic, certifications }),
            contentType: 'application/json',
            success: function() {
                alert('Produce added successfully');
                $('#addProduceForm')[0].reset();
            },
            error: function() {
                alert('Error adding produce');
            }
        });
    });

    $('#addTransportDataForm').submit(function(event) {
        event.preventDefault();

        const produceId = parseInt($('#produceId').val());
        const timestamp = new Date($('#timestamp').val()).getTime() / 1000;
        const location = $('#location').val();
        const temperature = $('#temperature').val();
        const humidity = $('#humidity').val();

        $.ajax({
            url: '/transport-data',
            method: 'POST',
            data: JSON.stringify({ produceId, timestamp, location, temperature, humidity }),
            contentType: 'application/json',
            success: function() {
                alert('Transport data added successfully');
                $('#addTransportDataForm')[0].reset();
            },
            error: function() {
                alert('Error adding transport data');
            }
        });
    });

    $('#getProduceForm').submit(function(event) {
        event.preventDefault();

        const produceId = $('#getProduceId').val();

        $.ajax({
            url: `/produce/${produceId}`,
            method: 'GET',
            success: function(produce) {
                const harvestDate = new Date(produce.harvestDate * 1000).toLocaleDateString();
                const produceHtml = `
                    <h3>Produce Details</h3>
                    <p><strong>ID:</strong> ${produce.id}</p>
                    <p><strong>Name:</strong> ${produce.name}</p>
                    <p><strong>Farm:</strong> ${produce.farm}</p>
                    <p><strong>Harvest Date:</strong> ${harvestDate}</p>
                    <p><strong>Is Organic:</strong> ${produce.isOrganic}</p>
                    <p><strong>Certifications:</strong> ${produce.certifications.join(', ')}</p>
                `;
                $('#getProduceResult').html(produceHtml);
            },
            error: function() {
                alert('Error getting produce');
            }
        });
    });

    $('#getTransportDataForm').submit(function(event) {
        event.preventDefault();

        const produceId = $('#getTransportDataId').val();

        $.ajax({
            url: `/transport-data/${produceId}`,
            method: 'GET',
            success: function(transportData) {
                let transportDataHtml = '<h3>Transport Data</h3>';
                transportData.forEach(function(data) {
                    const timestamp = new Date(data.timestamp * 1000).toLocaleString();
                    transportDataHtml += `
                        <p><strong>Produce ID:</strong> ${data.produceId}</p>
                        <p><strong>Timestamp:</strong> ${timestamp}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Temperature:</strong> ${data.temperature}</p>
                        <p><strong>Humidity:</strong> ${data.humidity}</p>
                        <hr>
                    `;
                });
                $('#getTransportDataResult').html(transportDataHtml);
            },
            error: function() {
                alert('Error getting transport data');
            }
        });
    });
});