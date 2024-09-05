<template>
  <div class="inventory-container">
    <h1 class="inventory-title">Car Inventory</h1>
    <div class="search-container">
      <input v-model="search" placeholder="Search..." class="search-input" />
      <button @click="searchCars" class="search-button">Search</button>
      <button @click="toggleFilter" class="filter-button">
        {{ showFilter ? 'Hide Filters' : 'Show Filters' }}
      </button>
    </div>
    
    <div v-if="showFilter" class="filter-form">
      <h2>Filter Cars</h2>
      <label>
        Min Mileage:
        <input type="number" v-model.number="filters.minMileage" placeholder="Min Mileage" class="filter-input"/>
      </label>
      <label>
        Max Mileage:
        <input type="number" v-model.number="filters.maxMileage" placeholder="Max Mileage" class="filter-input"/>
      </label>
      <label>
        Min Year:
        <input type="number" v-model.number="filters.minYear" placeholder="Min Year" class="filter-input"/>
      </label>
      <label>
        Max Year:
        <input type="number" v-model.number="filters.maxYear" placeholder="Max Year" class="filter-input"/>
      </label>
      <label>
        Min Price:
        <input type="number" v-model.number="filters.minPrice" placeholder="Min Price" class="filter-input"/>
      </label>
      <label>
        Max Price:
        <input type="number" v-model.number="filters.maxPrice" placeholder="Max Price" class="filter-input"/>
      </label>
      <button @click="applyFilters" class="filter-button">Apply Filters</button>
    </div>

    <ul class="car-list">
      <li v-for="car in filteredCars" :key="car.vin" class="car-item" @click="openBuyModal(car)">
        <span class="car-info">{{ car.year }} - {{ car.make }} {{ car.model }} - {{ car.color }} - ${{ car.price }} - {{ car.mileage }} miles</span>
        <div v-if="car.status === 'Sold'" class="status-badge">Sold</div>
      </li>
    </ul>
    
    <div v-if="showModal" class="modal-overlay" @click="closeBuyModal">
      <div class="modal-content" @click.stop>
        <h2>{{ selectedCar.status === 'Sold' ? 'Car Sold' : 'Buy Car' }}</h2>
        <div v-if="selectedCar.status === 'Sold'" class="modal-text">
          <p>This car is already sold. You can no longer purchase it.</p>
        </div>
        <div v-else class="modal-text">
          <p>Make: {{ selectedCar.make }}</p>
          <p>Model: {{ selectedCar.model }}</p>
          <p>Year: {{ selectedCar.year }}</p>
          <p>Color: {{ selectedCar.color }}</p>
          <p>Price: ${{ selectedCar.price }}</p>
          <p>Mileage: {{ selectedCar.mileage }} miles</p>
        </div>
        <button v-if="selectedCar.status === 'Sold'" @click="notifyWhenAvailable" class="modal-button notify-button">Notify When Available</button>
        <button v-else @click="buyCar" class="modal-button buy-button">Confirm Purchase</button>
        <button @click="closeBuyModal" class="modal-button close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cars: [],
      search: '',
      showModal: false,
      selectedCar: null,
      showFilter: false,
      filters: {
        minMileage: null,
        maxMileage: null,
        minYear: null,
        maxYear: null,
        minPrice: null,
        maxPrice: null,
      },
    };
  },
  mounted() {
    this.loadCars();
  },
  computed: {
    filteredCars() {
      return this.cars
        .filter((car) =>
          car.make.toLowerCase().includes(this.search.toLowerCase()) ||
          car.model.toLowerCase().includes(this.search.toLowerCase()) ||
          car.color.toLowerCase().includes(this.search.toLowerCase())
        )
        .filter((car) => {
          const { minMileage, maxMileage, minYear, maxYear, minPrice, maxPrice } = this.filters;
          return (
            (minMileage === null || car.mileage >= minMileage) &&
            (maxMileage === null || car.mileage <= maxMileage) &&
            (minYear === null || car.year >= minYear) &&
            (maxYear === null || car.year <= maxYear) &&
            (minPrice === null || car.price >= minPrice) &&
            (maxPrice === null || car.price <= maxPrice)
          );
        });
    },
  },
  methods: {
    async loadCars() {
      try {
        const response = await fetch('/inventory.json'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.cars = await response.json();
      } catch (error) {
        console.error('Error loading cars:', error);
      }
    },
    openBuyModal(car) {
      this.selectedCar = car;
      this.showModal = true;
    },
    closeBuyModal() {
      this.selectedCar = null;
      this.showModal = false;
    },
    buyCar() {
      if (!this.selectedCar) return;
      this.selectedCar.status = 'Sold';
      this.closeBuyModal();
    },
    notifyWhenAvailable() {
      alert('You will be notified when this car is available again.');
      this.closeBuyModal();
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      this.showFilter = false;
    }
  }
};
</script>


<style>
body {
  background-image: url('https://mrwallpaper.com/images/hd/drifting-red-car-7w4dllyyw5xsygcy.jpg'); 
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center center; 
  background-attachment: fixed; 
  margin: 0; 
  padding: 0; 
}

.inventory-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: rgba(247, 249, 252, 0.8); 
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.inventory-title {
  font-size: 3rem;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin-bottom: 30px;
  color: rgb(6, 114, 150);
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  width: 250px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
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
}

.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.filter-button {
  padding: 10px 30px;
  font-size: 1.1rem;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.filter-button:hover {
  background-color: #138496;
  transform: scale(1.05);
}

.filter-form {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.filter-form h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.filter-form label {
  display: block;
  margin-bottom: 15px;
}

.filter-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.car-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.car-item {
  position: relative;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.car-item:hover {
  background-color: #f0f0f0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.car-info {
  font-size: 1rem;
  color: #555;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #dc3545;
  border-radius: 12px;
  text-transform: uppercase;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-close-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-close-button:hover {
  color: #e63946;
}

.modal-body {
  margin-bottom: 20px;
  font-size: 1rem;
  color: #333;
}

.modal-text {
  margin-bottom: 20px;
}

.modal-text p {
  margin: 0;
  font-size: 1.1rem;
}

.modal-button {
  padding: 12px 25px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin: 5px;
}

.buy-button {
  background-color: #28a745;
}

.buy-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.notify-button {
  background-color: #ffc107;
}

.notify-button:hover {
  background-color: #e0a800;
  transform: scale(1.05);
}

.close-button {
  background-color: #dc3545;
}

.close-button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
