# SkillFlex 🛠️🔗

[![Solana Devnet](https://img.shields.io/badge/Network-Devnet-green.svg)](https://docs.solana.com/cluster/rpc-endpoints)  
[![OpenRouter](https://img.shields.io/badge/AI%20Engine-OpenRouter-ff69b4.svg)](https://openrouter.ai)

> **Turn Your Skill Into Proof**  
> A decentralized credentialing platform: take AI‑evaluated challenges, mint soulbound NFTs on Solana, and showcase your verified skills.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture](#-architecture)
5. [Repo Structure](#-repo-structure)
6. [Installation & Setup](#-installation--setup)
7. [Configuration](#-configuration)
8. [Usage](#-usage)
9. [Smart Contract Highlights](#-smart-contract-highlights)
10. [Roadmap](#-roadmap)
11. [Contributing](#-contributing)
12. [License](#-license)
13. [Contact](#-contact)

---

## 🚀 Project Overview
SkillFlex is a full-stack dApp that empowers learners and professionals to:
- **Attempt real-world skill challenges** (text, code, file)
- **Get instant AI evaluation** via OpenRouter
- **Mint a non-transferable (soulbound) NFT** on Solana as immutable proof of skill

Every credential is tied to your wallet and can be displayed in Phantom or shared on social media.

---

## ✨ Key Features
- **Challenge Engine**: Dynamic tasks delivered in multiple modes
- **AI Evaluation**: Strict, real-time scoring via `mistral-7b-instruct:free` (OpenRouter)
- **Soulbound NFTs**: Minted on Solana Devnet using Anchor + Metaplex metadata
- **Custom NFT Template**: Neon-dark design showing challenge code, score, masked wallet, timestamp
- **History & Analytics**: On-demand mint history from MongoDB Atlas
- **Modern UI/UX**: React + Vite + TailwindCSS with neon theme, Orbitron font, animations
- **Wallet Integration**: Phantom connect/disconnect flow, UX gating

---

## 🛠️ Tech Stack

| Layer         | Technology                         | Purpose                                     |
|---------------|------------------------------------|---------------------------------------------|
| Frontend      | React, Vite, TailwindCSS           | Dynamic UI, rapid dev, neon/dark styling    |
| AI Layer      | Flask, OpenRouter API (LLMs)       | Submission evaluation, scoring logic        |
| Blockchain    | Solana Devnet, Anchor (Rust)       | Soulbound NFT minting, on-chain credential  |
| Database      | MongoDB Atlas (Free Tier)          | Mint history, user records                  |
| Storage       | IPFS (via Pinata/Web3.Storage)     | NFT metadata & images                       |

---

## 📐 Architecture

```
[Browser] — React/Vite/Tailwind
    ↳ “/”, “/challenge/:id”, “/result”
    ↳ Phantom Wallet Context → Connect/Disconnect

[Flask API] — Evaluate → OpenRouter AI → Score
           └ Mint → Anchor Program → Solana Devnet
           └ Log → MongoDB Atlas

[IPFS] — Store dynamic NFT metadata/images
```

---

## 📂 Repo Structure

```
PROOF_OF_SKILL/
├─ backend/                  # Flask API & AI evaluation
│   ├─ app.py                # Main Flask server
│   ├─ evaluate.py           # LLM prompt logic
│   └─ .env                  # (gitignored) secrets & keys
│
├─ frontend/client_vite/     # React/Vite app
│   ├─ src/                  # React components & pages
│   ├─ public/               # Static assets, index.html
│   └─ vite.config.js
│
├─ smart_contract/           # Solana Anchor program
│   ├─ programs/             # Rust source
│   ├─ Anchor.toml           # Anchor config
│   └─ test-ledger/          # (gitignored) local validator state
│
├─ .gitignore                # Exclude node_modules, dist, etc.
└─ README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js >= 16, npm or yarn
- Python 3.9+, pip
- Rust & Anchor CLI
- Solana CLI  
  ```bash
  solana config set --url https://api.devnet.solana.com
  ```
- Phantom Wallet extension

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/skillflex.git
cd skillflex
```

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Fill in keys in .env
flask run --port 5000
```

### 3. Frontend
```bash
cd frontend/client_vite
npm install
npm run dev   # http://localhost:5173
```

### 4. Smart Contract (Anchor)
```bash
cd smart_contract
anchor build
anchor deploy --provider.cluster devnet
```

---

## 🔧 Configuration

Create `.env` in `/backend`:
```ini
OPENROUTER_API_KEY=your_openrouter_key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillflex
SOLANA_RPC_URL=https://api.devnet.solana.com
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

1. Connect Phantom on the Home page  
2. Select & complete a challenge  
3. Submit via text/code/file  
4. View AI score & retry if desired  
5. Mint your NFT credential (soulbound)  
6. Share on LinkedIn/X or view History  

---

## 🔗 Smart Contract Highlights

- Anchor v0.31.1 program mints an NFT with:
  - **Metadata URI** (IPFS)
  - **Name**: Challenge #ID Mastery
  - **Symbol**: SFx
- **Soulbound** – non-transferable to ensure authenticity

---

## 🛣️ Roadmap

- **v1.1**: Multi-org portal & custom challenge creation  
- **v1.2**: Leaderboard & DAO-governed challenges  
- **v1.3**: Mobile wallet badges & Web3 recruiter integrations  
- **v2.0**: 1 Million credentials minted  

---

## ✉️ Contact

**Suhas B M**  
🔗 [GitHub](https://github.com/suhasbm09) | ✉️ suhaasbm2004@gmail.com