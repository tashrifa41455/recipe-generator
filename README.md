# RecipeAI 🍳

An AI-powered Recipe Generator built with **React, Vite, Express, MongoDB, and Google Gemini AI**.

RecipeAI allows users to enter any dish name and automatically generates a complete, easy-to-follow recipe using AI. Generated recipes are stored in MongoDB and can be viewed later from the Saved Recipes section.

---

## ✨ Features

### 🤖 AI Recipe Generation

* Enter any dish name.
* Generate a complete recipe using Google Gemini AI.
* Recipes include:

  * Recipe name
  * Description
  * Preparation time
  * Cooking time
  * Servings
  * Difficulty
  * Ingredients
  * Instructions
  * Cooking tips

### 💾 MongoDB Recipe Storage

* Every successfully generated recipe is automatically saved in MongoDB.
* Recipes remain available after refreshing the website.
* Saved recipes are fetched from the backend API.

### 📚 Saved Recipes / Recipe History

* View previously generated recipes.
* Recipes are displayed in a clean card layout.
* Saved recipes are loaded from MongoDB.

### 🔎 Recipe Search

* Search saved recipes by recipe name.
* Results update as the user types.
* Displays a friendly message when no recipe is found.

### 👁️ View Full Recipe

* Open a saved recipe and view complete details.
* View ingredients, instructions, and cooking tips.

### 🗑️ Delete Recipe

* Delete unwanted saved recipes.
* Confirmation is shown before deletion.
* Deleted recipes are removed from MongoDB.

### ❤️ Favorite Recipes

* Mark recipes as favorites.
* Easily identify favorite recipes.
* Filter recipes to show favorites.

### 🖨️ Print Recipe

* Print a clean version of the selected recipe.
* Unnecessary website elements are excluded from the printed version.

### 📋 Copy Recipe

* Copy the complete recipe to the clipboard.
* Includes recipe details, ingredients, instructions, and tips.

### 🕒 Recipe Date

* Shows when a recipe was generated.
* Uses the MongoDB `createdAt` timestamp.

### 🌙 Dark Mode

* Switch between Light Mode and Dark Mode.
* Theme preference is stored in `localStorage`.
* Theme remains after refreshing the page.

### 📱 Responsive Design

* Works on:

  * Desktop
  * Tablet
  * Mobile

### ⏳ Loading & Error States

* Loading indicator while AI generates a recipe.
* User-friendly error messages.
* Handles backend and recipe-generation errors.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini AI

---

## 📁 Project Structure

```text
recipe-generator/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── models/
│   │   └── Recipe.js
│   │
│   ├── db.js
│   ├── recipeRoutes.js
│   ├── server.js
│   └── .env
│
├── public/
│
├── package.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

The application follows this flow:

```text
User enters a dish
        ↓
React Frontend
        ↓
Express Backend
        ↓
Google Gemini AI
        ↓
Recipe generated
        ↓
Recipe saved to MongoDB
        ↓
Recipe returned to Frontend
        ↓
Recipe displayed to User
        ↓
Saved Recipes fetched from MongoDB
```

---

## 🔌 API Endpoints

### Generate Recipe

```http
POST /api/recipe
```

Request:

```json
{
  "dish": "Chicken Biryani"
}
```

The backend sends the dish name to Gemini AI, generates the recipe, saves it to MongoDB, and returns the saved recipe.

---

### Get Saved Recipes

```http
GET /api/recipe
```

Returns all saved recipes from MongoDB.

Example response:

```json
{
  "success": true,
  "recipes": []
}
```

---

## 🗄️ MongoDB

The application uses MongoDB Atlas for persistent recipe storage.

Database:

```text
recipeGenerator
```

Collection:

```text
recipes
```

Each recipe document contains:

```text
_id
name
description
prepTime
cookTime
servings
difficulty
ingredients
instructions
tips
createdAt
updatedAt
__v
```

Mongoose timestamps automatically create:

```text
createdAt
updatedAt
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
```

### Important

Never upload `.env` to GitHub.

The `.env` file should be included in `.gitignore`.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd recipe-generator
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Configure environment variables

Create:

```text
server/.env
```

and add:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
```

---

## ▶️ Run the Project

### Start Backend

Open a terminal inside the `server` folder:

```bash
node server.js
```

You should see:

```text
MongoDB connected successfully
Server running at http://localhost:5000
```

### Start Frontend

Open another terminal in the main project folder:

```bash
npm run dev
```

Vite will provide a local development URL such as:

```text
http://localhost:5173
```

---

## 🧪 Testing

The application can be tested by:

1. Entering a dish name.
2. Clicking **Generate Recipe**.
3. Checking the generated recipe.
4. Checking MongoDB Atlas to confirm the recipe was saved.
5. Opening **Saved Recipes**.
6. Searching saved recipes.
7. Viewing a complete recipe.
8. Favoriting a recipe.
9. Copying a recipe.
10. Printing a recipe.
11. Deleting a recipe.
12. Switching between Light and Dark Mode.
13. Testing the interface on mobile and desktop.

---

## 📝 Example

User enters:

```text
Chicken Biryani
```

RecipeAI generates:

```text
Recipe Name
Description
Preparation Time
Cooking Time
Servings
Difficulty
Ingredients
Instructions
Cooking Tips
```

The generated recipe is then saved automatically in MongoDB.

---

## 🎯 Project Goal

The goal of RecipeAI is to provide a simple and intelligent cooking assistant where users can generate recipes instantly and keep their previously generated recipes organized in one place.

---

## 🔮 Future Improvements

Possible future features include:

* User authentication
* Personal recipe collections
* Recipe categories
* Ingredient-based recipe search
* Dietary preferences
* Vegetarian/Vegan filters
* Recipe ratings
* Recipe sharing
* Recipe images
* Voice-based recipe generation
* Shopping list generation
* Cloud deployment

---

## 👩‍💻 Developer

**Tashrifa Naz**

BS Computer Science Graduate

Full Stack Web Development Learner

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
