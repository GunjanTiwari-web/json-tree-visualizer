# 🌳 JSON Tree Visualizer

A React-based **JSON Tree Visualizer** built for the **APIWiz Frontend Assignment**.  
This application lets users paste any JSON input and visualize it as an **interactive, color-coded tree structure**.  
It also includes **search**, **dark mode**, **download as image**, and **reset** features.

---

## 🚀 Features

### 🧠 Core Functionalities
- **JSON Input:** Paste your JSON in the input box and visualize instantly.
- **Tree Visualization:** Each node represents a key/value or nested object.
- **Color-coded Nodes:**  
  - 🟦 Objects → Blue  
  - 🟩 Arrays → Green  
  - 🟨 Primitive values → Yellow

### 🔍 Search Functionality (Mandatory)
- Supports **JSON path-based search** (e.g.,  
  - `$.user.name`  
  - `$.user.address.city`  
  - `$.user.items[0].name`)
- Highlights the **matching node** in green.
- Displays “✅ Match found” or “❌ No match found” message.
- Automatically pans to the matched node for better visibility.

### 💡 Additional Features
- 🌙 **Dark/Light Mode Toggle**
- ♻️ **Reset JSON Tree**
- 📋 **Click-to-copy** JSON path
- 📸 **Download Tree as Image (PNG)**

---

## 🧩 Tech Stack

| Technology | Description |
|-------------|-------------|
| **React + Vite** | Fast modern frontend setup |
| **React Flow** | Interactive tree/graph rendering |
| **Tailwind CSS** | Modern utility-first styling |
| **html-to-image** | Converts the React Flow tree to PNG |
| **PostCSS** | CSS processing for Tailwind |

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/GunjanTiwari-web/json-tree-visualizer.git

# 2️⃣ Navigate to the project
cd json-tree-visualizer

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run locally
npm run dev
