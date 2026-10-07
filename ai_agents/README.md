# AI Agents Module

AI-agent module for the **AI-Powered Multi-Agent Startup Assistant**.

## Agents

The system currently uses 3 AI agents:

1. Market Agent
2. Funding Agent
3. Legal Agent

Each agent returns exactly **5 short values**.

## Input

The agents receive:

* Startup Name
* Startup Idea
* Location
* Budget
* Sector

These values will come from the frontend through the backend.

## Output

### Market Agent

* Market Size
* Growth Rate
* Target Users
* Demand
* Competition

### Funding Agent

* Funding Required
* Funding Stage
* Investors
* Grants
* Runway

### Legal Agent

* Registration
* License
* Privacy
* Legal Risk
* Compliance

## Architecture

Frontend
   ↓
Backend API
   ↓
Agent Manager
   ↓
┌─────────┬─────────┬─────────┐
│ Market  │ Funding │ Legal   │
└─────────┴─────────┴─────────┘
   ↓
Structured JSON
   ↓
Backend
   ↓
Frontend


## LLM

* Primary: Groq
* Model: `openai/gpt-oss-120b`
* Backup: Ollama
* Backup Model: `llama3.2`
* Cache: Local JSON cache

## Project Structure


ai_agents/
│
├── agents/
│   ├── market_agent.py
│   ├── funding_agent.py
│   └── legal_agent.py
│
├── prompts/
│   ├── market_prompt.py
│   ├── funding_prompt.py
│   └── legal_prompt.py
│
├── services/
│   ├── llm_service.py
│   ├── web_search_service.py
│   ├── cache_service.py
│   └── json_service.py
│
├── agent_manager.py
├── main.py
├── requirements.txt
├── README.md
├── .env
└── .gitignore


## Team Integration

Member 3 provides structured JSON to Member 2.

The backend passes frontend input to:


run_all_agents(
    startup_name,
    startup_idea,
    location,
    budget,
    sector
)

The AI module does not handle frontend UI or database operations.

## Running


pip install -r requirements.txt
python main.py

