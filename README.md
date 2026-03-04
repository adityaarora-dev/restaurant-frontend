# Restaurant Frontend – React + Vite

This project is a **React + Vite frontend application** designed for a restaurant system.
It provides an interface for **customers to view menus based on their table number** and for **chefs to manage orders using a dashboard**.

The application is built using **React for UI development** and **Vite for fast build and development performance**.

---

# 🚀 Features

* Table-based menu access
* Chef dashboard interface
* Fast development using Vite
* Modular React component structure
* Separate styling for pages
* Clean project architecture

---

# 🛠 Technologies Used

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

---

# 🌐 Application Routes

After running the project locally, the following routes can be accessed:

### Customer Menu Page

Displays the menu for a specific table.

```text
http://localhost:5173/?table=10
```

### Chef Dashboard

Interface for chefs to manage menu/orders.

```text
http://localhost:5173/chef
```

---

# 📂 Project Structure

```text
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

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/react-frontend.git
```

Navigate into the project directory:

```bash
cd react-frontend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

# 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 📌 Future Improvements

* Backend API integration
* Real-time order updates
* Authentication system
* Database connectivity
* Deployment to cloud platforms

---

# 👨‍💻 Author

Aditya

---

# 📄 License

This project is open source and available under the MIT License.
