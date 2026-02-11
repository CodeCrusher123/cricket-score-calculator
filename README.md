# Cricket Run Rate & Match Outcome Calculator 🏏

A lightweight **full-stack cricket calculator** built using **Flask + HTML/CSS/JS**.  
It calculates **Current Run Rate (CRR)**, **Required Run Rate (RRR)**, and predicts **match outcome** based on user inputs.

---

## 🚀 Features

- Live **Current Run Rate** calculation  
- Live **Required Run Rate** calculation  
- Automatic detection of:
  - Match Won
  - Match Lost
  - Match Tied
  - Match Ongoing
  - Match Not Started
- Clean UI with modern layout
- Fully responsive design
- Simple backend API using Flask

---

## 📁 Project Folder Structure

```text
cricket-calculator/
│
├── app.py
├── logic.py
├── requirements.txt
├── .gitignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── assets/
│       └── (optional images/icons)
│
└── README.md
```

---

## 🔧 Technologies Used

### **Frontend**
- HTML5  
- CSS3  
- JavaScript (vanilla)

### **Backend**
- Python 3  
- Flask

---

## 🔥 How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/cricket-calculator.git
cd cricket-calculator
```

### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
```

### 3️⃣ Activate Environment  
Windows:
```bash
venv\Scripts\activate
```
Mac/Linux:
```bash
source venv/bin/activate
```

### 4️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 5️⃣ Run the Server
```bash
python app.py
```

Then open:  
```
http://127.0.0.1:5000
```

---

## 📝 API Input Format

```json
{
  "metrics": {
    "total_overs": 20,
    "current_over": 7.4,
    "target": 168,
    "current_score": 69,
    "wickets": 2
  }
}
```

---

## 🧠 Core Logic

The backend:
- Converts **overs → balls**
- Computes CRR & RRR using accurate ball-based calculation
- Determines match status using complete conditional flow

---

## 🌟 Future Improvements

- Add scoreboard history  
- Add probability-based match prediction  
- Add dark/light mode  
- Add animations on value updates  

---

## 🧑‍💻 Author

Made by **NILAKESH BARMAN**  
GitHub: **https://github.com/CodeCrusher123**

---

## 📜 License

MIT License

---

