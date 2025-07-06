# ⚙️ React Pipeline Builder

A modular visual pipeline builder built with **React**, **React Flow**, and **vanilla CSS**, allowing users to drag, drop, and connect nodes to build dynamic workflows with real-time visual feedback and edge generation.

[![Live Demo](https://img.shields.io/badge/Demo-Live-blue?style=flat-square)](https://pipeline-builder-one.vercel.app)

---

## ✨ Features

- 🔌 **Auto Edge Creation** based on `{{variable}}` references inside `TextNode`
- 💊 **Variable Pills** inside `TextNode`, removable with a click
- 📦 **LLM Node** with `system` and `prompt` inputs
- ⚙️ **Reusable AbstractNode** to render multiple node types
- 🖱️ **Drag & Drop Nodes**, fully integrated with React Flow
- 🎨 **Theme Toggle (Dark/Light)**
- 💾 **Action Buttons**: Save, Export JSON, Reset with animations
- ⚡ Built using `Zustand` for efficient state management

> **Coming soon**: Variable suggestions dropdown while typing `{{` inside `TextNode`.

---

## 🛠 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/react-pipeline-builder.git
cd react-pipeline-builder
````

2. **Install dependencies**

```bash
npm install
```

3. **Start the app**

```bash
npm run dev
# or
npm start
```

---

## 📁 Folder Structure

```
src/
├── Components/
│   └── AbstractNode.js
├── nodes/
│   ├── inputNode.js
│   ├── outputNode.js
│   ├── textNode.js
│   ├── llmNode.js
│   ├── ConfigNode.js
│   ├── SurveyNode.js
│   ├── APICallNode.js
│   ├── CommentNode.js
│   └── ConditionNode.js
├── store.js
├── ActionButtons.js
├── toolbar.js
├── draggableNode.js
├── ui.js
├── App.js
└── index.js
```

---

## 🧭 Planned Features

The following features are currently under development or planned:

1. 🧠 **Variable Suggestions in TextNode**  
   Show a smart dropdown with available variables when user types `{{`, allowing easy insertion.

2. ❗ **Error Handling for Variable Dependencies**  
   Display visual error states for nodes that reference undefined or disconnected variables.

3. 🤖 **LLM Node Integration with OpenAI API**  
   Execute actual LLM calls using OpenAI's API, enabling real pipeline execution and output preview.

4. 📚 **KnowledgeBase Node (Chatbot Builder)**  
   Upload `.pdf`, `.txt`, or `.doc` files to create a knowledge base that can be linked to the LLM node.  
   Ultimately, this will enable building a **full-fledged chatbot** that answers based on uploaded document context.

---

💡 The goal is to evolve this pipeline builder into a **powerful no-code chatbot creation platform**.

---

## 🧑‍💻 Author

Made with ❤️ by **Mohit Harge**
