# SkillFlex 🛠️🔗

[![Solana Devnet](https://img.shields.io/badge/Network-Devnet-green.svg)](https://docs.solana.com/cluster/rpc-endpoints)  
[![OpenRouter](https://img.shields.io/badge/AI%20Engine-OpenRouter-ff69b4.svg)](https://openrouter.ai)

> **Turn Your Skill Into Proof**  
> A decentralized credentialing platform: attempt AI-evaluated challenges, mint soulbound NFTs on Solana, and showcase your verified skills.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)  
2. [Key Features](#-key-features)  
3. [Tech Stack](#-tech-stack)  
4. [Architecture](#-architecture)  
5. [Repository Structure](#-repository-structure)  
6. [Installation & Setup](#-installation--setup)  
7. [Configuration](#-configuration)  
8. [Usage](#-usage)  
9. [Smart Contract Highlights](#-smart-contract-highlights)  
10. [Roadmap](#-roadmap)  
11. [Contact](#-contact)  

---

## 🚀 Project Overview
SkillFlex is a full-stack dApp that empowers learners and professionals to:
- **Attempt real-world challenges** (text, code, file)  
- **Get instant, strict AI evaluation** via OpenRouter (Mistral 7B Instruct)  
- **Mint a non-transferable (soulbound) NFT** on Solana Devnet as immutable proof  
- **Share credentials** directly on LinkedIn or X  

---

## ✨ Key Features
- **Multimodal Challenges**: Submit text, code snippets, or file uploads  
- **AI Scoring**: Automated, repeatable scoring (0–100) with 85% pass threshold  
- **Soulbound NFTs**: Anchor + Metaplex mint, supply locked to 1  
- **Dynamic NFT Template**: Neon-dark design with your challenge code, score, masked wallet, timestamp  
- **History & Analytics**: On-chain mint history powered by MongoDB Atlas  
- **Sleek UI/UX**: React + Vite + TailwindCSS, Orbitron font, animated gradients & transitions  
- **Phantom Wallet Integration**: Connect/disconnect gating, devnet flow  

---

## 🛠️ Tech Stack

| Layer         | Technology                         | Purpose                                  |
| ------------- | ---------------------------------- | ---------------------------------------- |
| **Frontend**  | React, Vite, TailwindCSS           | Responsive, animated neon UI             |
| **AI Layer**  | Flask, OpenRouter API (LLM)        | Challenge evaluation and scoring         |
| **Blockchain**| Solana Devnet, Anchor (Rust)       | Soulbound NFT minting & metadata CPI     |
| **Database**  | MongoDB Atlas                      | Mint history and record storage          |
| **Storage**   | IPFS (via Pinata)                  | NFT metadata & images                    |

---

## 📐 Architecture


```
  Browser (React/Vite/Tailwind)
  ├─ / → Home
  ├─ /challenge/:id → Challenge UI (text/code/file)
  ├─ /result → Score & Mint
  └─ Phantom Wallet Context

  Flask API
  ├─ POST /evaluate → LLM prompt → Score
  ├─ POST /generate_metadata → Render + Pin to IPFS
  └─ POST /record_mint → Log to MongoDB

  Solana Devnet (Anchor + Metaplex)
  └─ Minting CPI for soulbound NFT

  IPFS (Pinata)
└─ Store dynamic PNG & JSON metadata
```

---

## 📂 Repo Structure

```
SKILL_FLEX/
│
├─ backend/ # Flask API & AI evaluation
│ ├─ app.py # Server routes
│ ├─ render_nft.py # PIL template rendering + Pinata upload
│ ├─ utils/ # scoring & challenge definitions
│ └─ requirements.txt # Python deps
│
├─ frontend/client_vite/ # React + Tailwind app
│ ├─ src/
│ │ ├─ components/ # Header, Modal, WalletContext…
│ │ ├─ pages/ # Home, Challenge, Result, History, About
│ │ └─ assets/ # fonts, images, challengeTasks.jsx
│ └─ vite.config.js
│
├─ smart_contract/ # Anchor program (Rust)
│ ├─ programs/
│ ├─ Anchor.toml
│ └─ target/ # build artifacts (gitignored)
│
├─ .env.example # Template for env vars
└─ README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
  - **Node.js >= 16** & npm/yarn  
  - **Python 3.9+** & pip  
  - **Rust & Anchor CLI**  
  - **Solana CLI** configured to Devnet  
  - **Phantom Wallet** extension

### 1. Clone
```bash
git clone https://github.com/suhasbm09/SKILL_FLEX.git
cd SKILL_FLEX
```

### 2. Backend
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in your OPENROUTER_API_KEY, PINATA keys, MONGODB_URI
flask run --port 5000
```

### 3. Frontend
```bash
cd frontend/client_vite
npm install
npm run dev    # → http://localhost:5173

```

### 4. Smart Contract (Anchor)
```bash
cd smart_contract
anchor build
anchor deploy --provider.cluster devnet
```

---

## 🔧 Configuration

Add to backend/.env:
```ini
OPENROUTER_API_KEY=your_openrouter_key
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_KEY=your_pinata_secret
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillflex

```

Add to root `.gitignore`:
```gitignore
/backend/.env
/frontend/client_vite/node_modules/
/smart_contract/target/
/smart_contract/test-ledger/
```

---

## 🏃 Usage

1. Connect Phantom (→ Devnet)

2. Select a skill challenge

3. Submit answer via text/code/file

4. View AI score & retry if needed

5. Mint your credential (85%+ pass)

6. Share on LinkedIn/X or check History

---

## 🔗 Smart Contract Highlights

- Program: minting(name, symbol, uri)

- Data: name, symbol, URI, 0% seller fee, closed supply

- CPI: Metaplex Metadata & Master Edition V3 for soulbound NFTs
---

## 🛣️ Roadmap

- **v1.1:** Custom challenge creation & permissions

- **v1.2:** Leaderboards & DAO-governed scoring

- **v1.3:** Mobile wallet integration & recruiter APIs

- **v2.0:** Mainnet-beta launch & cross-chain support

---

## ✉️ Contact

**Suhas B M**  


    GitHub: https://github.com/suhasbm09

    Email: suhaasbm2004@gmail.com

  > Building the future, one skill at a time.

