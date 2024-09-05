<template>
  <div class="dashboard-container">
    <h1>Admin Dashboard</h1>
    <div class="dashboard-content">
      <div class="section">
        <h2></h2>
        <AddCar />
      </div>
      <div class="section">
        <h2></h2>
        <UpdateCarStatus />
      </div>
    </div>
  </div>
</template>

<script>
import AddCar from '@/components/AddCar.vue';
import UpdateCarStatus from '@/components/UpdateCarStatus.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AddCar,
    UpdateCarStatus
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 40px;
  background-color: rgba(240, 240, 240, 0.8); 
  min-height: 100vh;
  font-family: 'Roboto', sans-serif; 
  background-image: url('https://mrwallpaper.com/images/hd/drifting-red-car-7w4dllyyw5xsygcy.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-content {
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.section {
  flex: 1;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  padding: 30px;
  min-width: 350px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.section:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

h1 {
  font-size: 3rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  color: white; 
}

h2 {
  font-size: 1.5rem; 
  color: #444;
  margin-bottom: 20px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .dashboard-content {
    flex-direction: column;
  }

  .section {
    min-width: auto;
  }
}
</style>
