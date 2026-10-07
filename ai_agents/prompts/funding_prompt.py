def build_research_prompt(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> str:

    return f"""
Research funding opportunities for this startup.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Budget: {budget} USD
Sector: {sector}

Find only:
- Suitable funding requirement
- Likely funding stage
- Relevant investor count/opportunities
- Relevant grants
- Practical runway estimate

RULES:
- Use current, reliable information.
- Funding amounts must be USD.
- Use $XK or $XM format.
- Investors must be a short count when supported.
- Grants must be USD.
- Runway must be months.
- Never invent funding amounts.
- Maximum 5 research bullets.
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
Analyze this startup's funding position.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Budget: {budget} USD
Sector: {sector}

Research:
{research}

Return EXACTLY FIVE values.

RULES:
- No explanations.
- Values only 1–3 words.
- Funding Required: $XK or $XM
- Funding Stage: 1–3 words
- Investors: short number
- Grants: $XK or $XM
- Runway: XX Months
- Never invent numbers.
- If unavailable, use N/A.

Return ONLY the required JSON.
"""