# Restaurant Frontend – React + Vite

This project is a **React + Vite frontend application** designed for a restaurant system.
It allows customers to **view the menu based on their table number** and provides a **Chef Dashboard** for managing restaurant operations.

React is used for building the user interface, while **Vite provides fast development and build performance**.

---

# 🚀 Features

* Table-based menu access
* Chef dashboard interface
* Fast development with Vite
* Modular React component structure
* Organized project architecture
* Separate styling for different pages

---

# 🛠 Technologies Used

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

---

# 📂 Project Structure

```
react-frontend
│
├── public
│   └── vite.svg
│
├── src
│   ├── assets
│   │   └── react.svg
│
│   ├── components
│
│   ├── pages
│   │   ├── ChefDashboard.jsx
│   │   └── Menu.jsx
│
│   ├── styles
│   │   ├── chef.css
│   │   ├── global.css
│   │   └── menu.css
│
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Requirements

Before running the project, make sure the following tools are installed on your system.

### Check Node.js

Run the following command in the terminal:

```bash
node -v
```

If Node.js is not installed, download and install it from:

https://nodejs.org

After installation, run the command again to verify it works.

---

### Check npm

Run:

```bash
npm -v
```

If npm is not installed, reinstall the **Node.js LTS version**, since npm comes bundled with Node.js.

---

### Check Git

Run:

```bash
git --version
```

If Git is not installed, download and install it from:

https://git-scm.com/downloads

Then verify again using the same command.

---

# 📥 Clone the Repository

Clone the project from GitHub:

```
git clone https://github.com/adityaarora-dev/restaurant-frontend
```

Move into the project directory:

```
cd restaurant-frontend
```

---

# 📦 Install Dependencies

Install all project dependencies:

```
npm install
```

This will automatically create the **node_modules** folder.

---

# ▶️ Run the Project

Start the development server:

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# 🌐 Application Routes

After the server starts, you can access the following routes.

### Customer Menu Page

```
http://localhost:5173/?table=10

```
<img width="1903" height="963" alt="image" src="https://github.com/user-attachments/assets/d250e18a-4648-4c4a-bccd-15fe7a1425f2" />
<img width="1897" height="967" alt="image" src="https://github.com/user-attachments/assets/2dbc4916-5aa1-4985-831a-32c82f1a4c0a" />
<img width="1901" height="965" alt="image" src="https://github.com/user-attachments/assets/d9dafce5-5082-4219-a138-fc9c42a62e57" />
<img width="1906" height="978" alt="image" src="https://github.com/user-attachments/assets/5ab9639e-5660-44fd-be52-d0b51110bf07" />



### Chef Dashboard

```
http://localhost:5173/chef
```
<img width="1911" height="974" alt="image" src="https://github.com/user-attachments/assets/255caf02-3fed-42c4-8950-75c9e1d27ea7" />
<img width="1908" height="971" alt="image" src="https://github.com/user-attachments/assets/9d93bac9-24c4-4939-9144-643c1bb93190" />
<img width="1903" height="960" alt="image" src="https://github.com/user-attachments/assets/b73ee0f3-2e05-4e57-81d3-700c6d2ef98b" />


---

# ⚙️ Optional (Production Build)

To create a production build:

```
npm run build
```

To preview the production build:

```
npm run preview
```

---

# 👨‍💻 Author

Aditya

---

# 📄 License

This project is open source and available under the MIT License.
