# ☀️ Weather App (React)

A clean, responsive weather application that displays current weather conditions for any city worldwide. Features temperature unit switching (Celsius/Fahrenheit) and remembers your recent searches.

---

### **Preview**
<img width="500" alt="Weather App Home" src="https://github.com/user-attachments/assets/94dcb16a-1f01-43d0-8a36-cb4fc5da607b" />
<img width="500" alt="Weather App City Details" src="https://github.com/user-attachments/assets/61294e8e-06fa-4307-994a-6af8d1c88154" />

---

## **Features**
✅ Real-time weather data (temperature, humidity, conditions)  
✅ Toggle between Celsius/Fahrenheit  
✅ Recent search history (stores last 5 cities)  
✅ Error handling for invalid locations  
✅ Responsive design with loading states  
✅ Persistent search history using localStorage  

---

## **Technologies Used**
- React (Functional Components + Hooks)
- WeatherAPI.com (or your API provider)
- CSS Modules for styling
- GitHub Pages (for deployment)

---

## **Setup Instructions**

### Prerequisites
- Node.js (v14+)
- npm/yarn
- API key from [WeatherAPI](https://www.weatherapi.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Install Dependencies:
   ```bash
   cd weather-app
   npm install
   ```
   
3. Start Development Server
   ```bash
   npm start
   ```

---

## **Deploying to GitHub Pages**

1. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these to package.json:
   ```json
   "homepage": "https://your-username.github.io/weather-app",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
   ```
   
3. Run deployment:
   ```bash
   npm run deploy
   ```
