
# 🧠 AI Auto TrackID Injector for JSX (Pre-commit Hook)

Automatically injects `data-trackid` attributes into JSX elements using AI (CodeLlama via [Ollama](https://ollama.com)). Helps developers add analytics tracking attributes effortlessly before every Git commit.

> 💡 Built with Node.js, jscodeshift, Husky, and CodeLlama (via Ollama in WSL).

---

## 📦 Features

- 🔍 Detects JSX elements missing `data-trackid`
- 🤖 Uses AI to suggest smart `data-trackid` values based on component or inner text
- 🛡️ Falls back to `autoTrack-xyz123` when AI fails
- ⚡ Git pre-commit hook auto-injects `data-trackid` into staged files
- 💻 Works seamlessly in WSL with Ollama + CodeLlama

---

## 🛠️ Prerequisites

- Node.js installed in **WSL**
- [Ollama](https://ollama.com) installed inside **WSL**
- CodeLlama model loaded (`ollama run codellama`)
- Git repo with Husky pre-commit hook configured

---

## 📁 Folder Structure

```

.
├── .husky/
│   └── pre-commit             # Git hook script
├── scripts/
│   └── trackid-injector.js    # Main injection logic
├── components/
│   └── Test.jsx               # Sample test file
├── package.json
└── README.md

````

---

## 🚀 How It Works

On every commit:
1. Scans staged `.jsx` files
2. Finds JSX elements missing `data-trackid`
3. Sends component or inner text to `ollama run codellama`
4. Injects smart `data-trackid`, or fallback like `autoTrack-f29c1d`
5. Rewrites and stages updated files

---

## 🧪 Example

**Before:**
```jsx
<div> product page details </div>
````

**After Commit:**

```jsx
<div data-trackid="productPageDetails"> product page details </div>
```

Or fallback:

```jsx
<div data-trackid="autoTrack-x91jfa"> product page details </div>
```

---

## 🧰 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/mrajkishor/Llamark.git
cd Llamark
```

### 2. Install Node Modules

```bash
npm install
```

### 3. Install & Run Ollama in WSL

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama run codellama
```

> Make sure Node.js is installed in WSL (`node -v`)

---

### 4. Enable Husky Git Hook

```bash
npx husky install
npx husky add .husky/pre-commit "bash .husky/pre-commit"
chmod +x .husky/pre-commit
```

### 5. Try It

Edit `components/Test.jsx` and add a new JSX element without `data-trackid`.

```bash
git add components/Test.jsx
git commit -m "Test trackid injection"
```

✅ You’ll see AI-injected `data-trackid` values.

---

## ⚙️ Customization

* Modify fallback format in `generateFallbackTrackId()`
* Add filtering (e.g., skip `span`, `div`) in `processFile()`
* Extend to `.tsx` files with minor changes

---

## 📄 License

MIT – use freely and improve responsibly.

---

## 🙌 Contributors

Built by [Raj Kishor Maharana](https://github.com/mrajkishor) with ❤️ for dev productivity.

