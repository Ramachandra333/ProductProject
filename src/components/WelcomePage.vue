<template>
    <div class="welcome-container">
      <header class="header">
      </header>
      <main class="main-content">
        <h1>Welcome to Crazy Cars</h1>
        <p>Ride your dream Car,Muscles with Engines !</p>
        
        <div class="button-container">
          <router-link to="/car-list" class="cta-button">Car Inventory</router-link>
          <router-link to="/admin-login" class="cta-button">Admin Login</router-link>
        </div>
      </main>
  
      <footer class="footer">
        <p>&copy; 2024 Car Showroom. All rights reserved.Approved by N2nSocrates</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WelcomePage'
  }
  </script>
  
  <style scoped>
.welcome-container {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-image: linear-gradient(to right bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('https://mrwallpaper.com/images/hd/drifting-red-car-7w4dllyyw5xsygcy.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(1.5); 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  padding: 20px;
}

.logo {
  height: 70px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1);
}

.main-content {
  padding: 80px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

p {
  font-size: 1.3rem;
  margin-bottom: 40px;
  font-weight: 300;
  color: #f0f0f0;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cta-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight : bold;
  color:black;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0px 5px 15px rgba(0, 123, 255, 0.4);
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
}

.cta-button:hover {
  transform: translateY(-5px);
  background: linear-gradient(135deg, #00d4ff, #007bff);
  box-shadow: 0px 8px 20px rgba(0, 123, 255, 0.7);
}

.footer {
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #f0f0f0;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
}

</style>