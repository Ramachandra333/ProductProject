<template>
  <div class="update-status-container">
    <h1>Update Car Status</h1>
    <form @submit.prevent="searchCar" class="car-form">
      <div class="form-group">
        <label for="vin">Search by VIN</label>
        <input v-model="search" id="vin" placeholder="Enter VIN" class="input-field" required />
        <button type="submit" class="search-button">Search</button>
      </div>
    </form>

    <div v-if="selectedCar" class="car-details">
      <p><strong>VIN:</strong> {{ selectedCar.vin }}</p>
      <p><strong>Make:</strong> {{ selectedCar.make }}</p>
      <p><strong>Model:</strong> {{ selectedCar.model }}</p>
      <p><strong>Status:</strong> <span :class="statusClass">{{ selectedCar.status }}</span></p>

      <button v-if="selectedCar.status === 'Available'" @click="markAsSold" class="action-button sold-button">
        Mark as Sold
      </button>
      <button v-else-if="selectedCar.status === 'Sold'" @click="markAsAvailable" class="action-button available-button">
        Mark as Available
      </button>
      <button v-else @click="notifyWhenAvailable" class="action-button notify-button">
        Notify When Available
      </button>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'UpdateCarStatus',
  setup() {
    const search = ref('');
    const selectedCar = ref(null);
    const statusClass = ref('');
    let carsData = [];

    onMounted(async () => {
      try {
        const response = await fetch('/inventory.json');
        carsData = await response.json();
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    });

    const searchCar = () => {
      if (!search.value.trim()) {
        alert('Please enter a valid VIN.');
        return;
      }
      const car = carsData.find(car => car.vin === search.value);
      if (car) {
        selectedCar.value = car;
        statusClass.value = car.status === 'Sold' ? 'sold' : 'available';
      } else {
        alert('Car not found. Please check the VIN.');
        selectedCar.value = null;
      }
    };

    const markAsSold = async () => {
      if (selectedCar.value) {
        try {
          await axios.put(`/inventory.json/${selectedCar.value.vin}`, { status: 'Sold' });
          selectedCar.value.status = 'Sold';
          statusClass.value = 'sold';
          alert('Car status updated to Sold');
        } catch (error) {
          console.error('Error updating car status:', error);
          alert('Error updating car status.');
        }
      } else {
        alert('Error updating car status.');
      }
    };

    const markAsAvailable = async () => {
      if (selectedCar.value) {
        try {
          await axios.put(`/inventory.json/${selectedCar.value.vin}`, { status: 'Available' });
          selectedCar.value.status = 'Available';
          statusClass.value = 'available';
          alert('Car status updated to Available');
        } catch (error) {
          console.error('Error updating car status:', error);
          alert('Error updating car status.');
        }
      } else {
        alert('Error updating car status.');
      }
    };

    const notifyWhenAvailable = () => {
      alert('Car is already sold. You will be notified when available.');
    };

    return { search, selectedCar, statusClass, searchCar, markAsSold, markAsAvailable, notifyWhenAvailable };
  }
};
</script>


<style scoped>
.update-status-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.update-status-container:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

h1 {
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin-bottom: 30px;
  color: rgb(6, 114, 150);
}

.car-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; 
}

.form-group label {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
}
.input-field {
  width: 300px;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.search-button {
  padding: 10px 30px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 10px; 
}

.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.car-details {
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.car-details p {
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
}

.sold {
  color: #d9534f;
}

.available {
  color: #5cb85c;
}

.action-button {
  padding: 12px 25px;
  font-size: 1.1rem;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.sold-button {
  background-color:red;
  color: white;
}

.sold-button:hover {
  background-color: red;
  transform: scale(1.05);
}

.available-button {
  background-color: green;
  color: white;
}

.available-button:hover {
  background-color: green;
  transform: scale(1.05);
}

.notify-button {
  background-color: #ffc107;
  color: white;
}

.notify-button:hover {
  background-color: #e0a800;
  transform: scale(1.05);
}
</style>

