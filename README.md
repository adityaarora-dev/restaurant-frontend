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

### Chef Dashboard

```
http://localhost:5173/chef
```

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
