const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'public', 'inventory.json');



app.post('/write_inventory', async (req, res) => {
  let actualJson = [];
  const itemObj = req.body;
  console.log("req.body", req.body);

  const content = 'This is the content to be written to the file.';

  const fileExitData = await fs.promises.readFile(filePath, 'utf8');
  console.log("fileExitData", fileExitData);


  if (fileExitData) {
    actualJson = JSON.parse(fileExitData);
    actualJson.push(itemObj);
    console.log("actualJson", actualJson);

    await fs.promises.writeFile(filePath, JSON.stringify(actualJson, null, 2), 'utf8');
    res.status(200).send('Data added successfully!');
  }

});



app.get('/inventory.json', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }
    try {
      const cars = JSON.parse(data);
      res.json(cars);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send('Internal Server Error');
    }
  });
});


app.put('/inventory.json/:vin', (req, res) => {
  const { vin } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send('Status is required');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      let cars = JSON.parse(data);
      let car = cars.find(car => car.vin === vin);

      if (!car) {
        return res.status(404).send('Car not found');
      }

      car.status = status;

      fs.writeFile(filePath, JSON.stringify(cars, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.send('Car status updated');
      });
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send('Internal Server Error');
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
