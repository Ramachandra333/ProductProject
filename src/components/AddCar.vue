<template>
  <div class="add-car-container">
    <h1>Add New Car</h1>
    <form @submit.prevent="addCar" class="car-form">
      <div class="input-group">
        <input v-model="newCar.vin" placeholder="VIN" required />
      </div>
      <div class="input-group">
        <input v-model="newCar.year" placeholder="Year" required />
        <input v-model="newCar.make" placeholder="Make" required />
      </div>
      <div class="input-group">
        <input v-model="newCar.model" placeholder="Model" required />
        <input v-model="newCar.color" placeholder="Color" required />
      </div>
      <div class="input-group">
        <input v-model="newCar.mileage" placeholder="Mileage" required />
        <input v-model="newCar.price" placeholder="Price" required />
      </div>
      <button type="submit">Add Car</button>
    </form>

    
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'AddCar',
  setup() {
    const newCar = ref({
      vin: '',
      year: '',
      make: '',
      model: '',
      color: '',
      mileage: '',
      price: '',
      status: 'Available'
    });

    const errorMessage = ref('');

    const addCar = async () => {
      try {
        let carsData = [];
        try {
          const response = await fetch('/inventory.json');
          carsData = await response.json();
        } catch (error) {
          console.error('Error fetching cars data:', error);
          errorMessage.value = 'Error fetching car inventory data.';
          return;
        }
        const existingCar = carsData.find(car => car.vin === newCar.value.vin);
        if (existingCar) {
          errorMessage.value = `Car with VIN ${newCar.value.vin} already exists.`;
          return;
        }
        await axios.post('/write_inventory', newCar.value);
        alert('Car added successfully!');
        errorMessage.value = ''; 
      } catch (error) {
        console.error('Error adding car:', error);
        errorMessage.value = 'An error occurred while adding the car.';
      }
    };

    return { newCar, addCar, errorMessage };
  }
}
</script>

<style scoped>
.add-car-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f7f9fc;
  border-radius: 15px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.add-car-container:hover {
  transform: scale(1.02);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  color: rgb(6, 114, 150);
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.car-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

input {
  flex: 1;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: border 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 15px 25px rgba(0, 123, 255, 0.5);
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  h1 {
    font-size: 2rem;
  }

  button {
    font-size: 1rem;
    padding: 12px;
  }
}
.error {
  color: rgb(184, 79, 79);
  font-weight: bold;
  margin-top: 10px;
}
</style>
