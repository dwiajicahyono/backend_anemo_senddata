const express = require('express');
const fs = require('fs').promises;
const axios = require('axios');
const FormData = require('form-data'); // Tambahkan ini
const app = express();

async function sendCSVData() {
    try {
        // Membaca konten dari file CSV secara asinkron
        const csvData = await fs.readFile('data.csv');

        // Buat form data dan tambahkan file CSV ke dalamnya
        const form = new FormData();
        form.append('csv', csvData, {
            filename: 'data.csv',
            contentType: 'text/csv'
        });

        // Mengirim data CSV ke endpoint lain dengan form data
        const response = await axios.post('https://vps.isi-net.org:7800/sendcsv', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('CSV data from file sent!', response.data);
    } catch (error) {
        console.error('Error sending CSV data:', error);
    }
}

// Panggil fungsi saat aplikasi dimulai
setInterval(sendCSVData , 600000)



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
