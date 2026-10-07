def build_research_prompt(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> str:

    return f"""
Research this startup.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Budget: {budget}
Sector: {sector}

Find only:

- Current market size
- Recent growth rate
- Target users
- Demand level
- Competition level

Rules:

- Market size must be USD billions.
- Growth must be percentage.
- Never invent numbers.
- Prefer reliable sources.
- Maximum 5 bullets.
- Maximum 2 sources.
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
Startup:
{startup_name}

Idea:
{startup_idea}

Location:
{location}

Budget:
{budget}

Sector:
{sector}

Research:
{research}

Return exactly FIVE values.

Rules:

- No explanations.
- Values must be 1–3 words.
- Market Size: $XB
- Growth Rate: XX%
- Target Users: 1–3 words
- Demand: High / Medium / Low
- Competition: High / Medium / Low
- Never invent data.
- If unavailable, use N/A.

Return ONLY the required JSON.
"""