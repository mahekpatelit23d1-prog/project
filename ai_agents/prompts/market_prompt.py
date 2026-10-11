
def build_research_prompt(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> str:
    return f"""
Research the market for this startup using current, reliable sources.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Sector: {sector}

Find:
1. Market size relevant to this startup
2. Recent market growth rate
3. Target users
4. Customer demand
5. Competition level

MARKET SIZE RULES:
- Report market size in USD billions.
- Identify the market definition and geographic scope.
- Prefer a market relevant to the startup's actual idea and location.
- Do not confuse global market size with local market size.
- Do not confuse total industry revenue with the startup's addressable market.
- Use a reliable source and its publication year.
- Never invent statistics.
- If a reliable, relevant estimate cannot be found, state N/A.
- Maximum 5 concise research bullets.
- Maximum 2 useful sources.
- Prefer official reports and reputable research sources.
- No long explanations.
"""


def build_final_prompt(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str,
    research: str
) -> str:
    return f"""
Create the final market assessment using only the research below.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Sector: {sector}

Research:
{research}

Return exactly these five fields as JSON.

RULES:
- market_size_billion must be a JSON number, not a string.
- Unit: USD billions.
- Example: 2.4 means USD 2.4 billion.
- Use the best supported estimate for the clearly identified market.
- Do not convert a local or global market estimate into another scope.
- Never invent a market size.
- If no reliable estimate is available, return null.
- growth_rate: percentage string or N/A.
- target_users: 1–3 words or N/A.
- demand: High, Medium, Low, or N/A.
- competition: High, Medium, Low, or N/A.
- Do not include explanations in field values.
- Return JSON only.
"""
