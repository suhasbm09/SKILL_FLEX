# 🚀 SkillFlex — Turn Your Skill Into Proof

[![Solana Devnet](https://img.shields.io/badge/Network-Devnet-green.svg)](https://docs.solana.com/cluster/rpc-endpoints)
[![OpenRouter](https://img.shields.io/badge/AI%20Engine-OpenRouter-ff69b4.svg)](https://openrouter.ai)
[![Built With](https://img.shields.io/badge/Built%20With-React%20%7C%20Solana%20%7C%20AI-blueviolet)](#tech-stack)

---

<div align="center">
  <img src="/frontend/client_vite/public/images/SkillFlex_logo.png" alt="SkillFlex Logo" width="96" />
  
  <h2><strong>Decentralized, AI-powered credentialing. <br/>Prove your skills. Mint your proof. Own your future.</strong></h2>
  <p>Modern glassmorphic UI · Monaco code editor · Soulbound NFTs · Instant AI scoring</p>
  <br>
  <img src="/frontend/client_vite/public/images/hero.png" alt="SkillFlex Hero Screenshot" width="900" style="margin-top:2em; border-radius: 24px; box-shadow: 0 8px 32px rgba(80,0,120,0.15);" />
</div>

---

## 🎬 Quick Demo
> <em>Coming Soon..<br> challenge → code editor → AI score → NFT mint → share</em>

---

## ✨ Why SkillFlex?

- ⚡ **Instant AI Evaluation:** Get real-time, strict feedback on your code, text, or file submissions.
- 🧑‍💻 **VS Code-like Editor:** Write code in a Monaco-powered, dark-themed editor—just like the pros.
- 🪪 **Soulbound NFTs:** Mint non-transferable credentials on Solana. Immutable, verifiable, and yours forever.
- 🟣 **Glassmorphic, Animated UI:** Modern, animated, and beautiful—every page is a delight to use.
- 🔒 **Secure by Design:** All API keys and secrets are loaded from environment variables. No hardcoding.
- 🌐 **Shareable Proof:** Instantly share your credential on LinkedIn, X, or anywhere.
- 📊 **History & Analytics:** Track your mints and progress—on-chain and off.

---

## 🛠️ Tech Stack

| Layer         | Technology & Tools                                 |
| ------------- | -------------------------------------------------- |
| **Frontend**  | React, Vite, TailwindCSS, **Monaco Editor**        |
| **Backend**   | Flask, OpenRouter AI (Mistral 7B)                  |
| **Blockchain**| Solana Devnet, Anchor (Rust), Metaplex             |
| **Database**  | MongoDB Atlas                                      |
| **Storage**   | IPFS (Pinata)                                      |

---

## 🧭 How It Works

1️⃣ **Choose a Challenge**  
2️⃣ **Submit your answer** (text, code, or file — with Monaco editor for code)  
3️⃣ **AI evaluates instantly** and gives a strict score  
4️⃣ **Score ≥ 85%? Mint your soulbound NFT credential**  
5️⃣ **Share your proof** on LinkedIn/X or view your on-chain history

---

## 🔒 Security & Best Practices
- **API keys and secrets are never hardcoded.**
- All sensitive values are loaded from `.env` files (see Configuration below).
- Never commit your `.env` to version control.

---

## ⚡ Quickstart

### Prerequisites
- Node.js >= 16, npm/yarn
- Python 3.9+, pip
- Rust & Anchor CLI
- Solana CLI (Devnet)
- Phantom Wallet extension

### 1. Clone & Setup
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

## ⚙️ Configuration

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
2. Select a challenge
3. Submit answer via text, code (Monaco), or file
4. View AI score & retry if needed
5. Mint your credential (85%+ pass)
6. Share or check your on-chain history

---

## 🔗 Smart Contract Highlights
- **Program:** minting(name, symbol, uri)
- **Data:** name, symbol, URI, 0% seller fee, closed supply
- **CPI:** Metaplex Metadata & Master Edition V3 for soulbound NFTs

---

## 🛣️ Roadmap
- **v1.1:** Custom challenge creation & permissions
- **v1.2:** Leaderboards & DAO-governed scoring
- **v1.3:** Mobile wallet integration & recruiter APIs
- **v2.0:** Mainnet-beta launch & cross-chain support

---

## ✉️ Contact
**Suhas B M**  
- GitHub: [suhasbm09](https://github.com/suhasbm09)
- Email: suhaasbm2004@gmail.com
- Portfolio: [suhas-bm](https://portfolio-suhasbm.vercel.app)
- LinkedIn: [Suhas B M](https://www.linkedin.com/in/suhas-b-m-88a179244)

---

<div align="center" style="margin-top:2em">
  <img src="/frontend/client_vite/public/images/SkillFlex_logo.png" alt="SkillFlex Logo" width="64" />
  <h3>Crafted with ❤️ by <a href="https://portfolio-suhasbm.vercel.app" target="_blank">Suhas B M</a></h3>
  <p><em>Building the future, one skill at a time.</em></p>
</div>

