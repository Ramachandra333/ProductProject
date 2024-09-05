<template>
    <div class="page-wrapper">
      <div class="login-container">
        <h1>Admin Login</h1>
        <form @submit.prevent="handleLogin" class="login-form">
          <input v-model="username" type="text" placeholder="Username" required class="input-field" />
          <input v-model="password" type="password" placeholder="Password" required class="input-field" />
          <button type="submit" class="submit-button">Log In</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    name: 'AdminLogin',
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
      const router = useRouter();
  
      const defaultUsername = 'supercars';
      const defaultPassword = 'dreamcars';
  
      const handleLogin = async () => {
        if (username.value === defaultUsername && password.value === defaultPassword) {
        
          localStorage.setItem('adminToken', 'default-token'); 
          successMessage.value = 'Login successful! Redirecting to dashboard...';
          setTimeout(() => {
            router.push('/admin-dashboard');
          }, 1000); 
        } else {
          try {
            const response = await axios.post('/api/admin/login', { username: username.value, password: password.value });
            localStorage.setItem('adminToken', response.data.token);
            successMessage.value = 'Login successful! Redirecting to dashboard...';
            setTimeout(() => {
              router.push('/admin-dashboard');
            }, 1000); 
          } catch (error) {
            errorMessage.value = 'Invalid username or password';
            console.error('Login error:', error);
          }
        }
      };
  
      return { username, password, errorMessage, successMessage, handleLogin };
    }
  }
  </script>
  
<style scoped>
  
  .page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('https://mrwallpaper.com/images/hd/drifting-red-car-7w4dllyyw5xsygcy.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.9); 
  margin: 0;
  font-family: 'Poppins', sans-serif; 
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.85); 
  border-radius: 15px; 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px; 
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: rgb(6, 114, 150); 
  font-weight: 700; 
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 100%;
}

.input-field {
  padding: 15px; 
  border: 2px solid #ccc; 
  border-radius: 10px; 
  font-size: 1.2rem; 
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff; 
  outline: none;
  box-shadow: 0 0 5px rgba(38, 143, 255, 0.5); 
}

.submit-button {
  padding: 15px;
  background: linear-gradient(135deg, #007bff, #00d4ff); 
  color: #fff;
  border: none;
  border-radius: 50px; 
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 123, 255, 0.4); 
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
  width: 100%; 
}

.submit-button:hover {
  background: linear-gradient(135deg, #00d4ff, #007bff); 
  transform: translateY(-5px); 
  box-shadow: 0px 8px 20px rgba(0, 123, 255, 0.7); 
}

.submit-button:active {
  background: #007bff;
  transform: translateY(0);
}

.error-message {
  color: #dc3545;
  margin-top: 20px; 
  font-weight: bold; 
}

.success-message {
  color: #28a745;
  margin-top: 20px; 
  font-weight: bold; 
}

  </style>
  