def build_research_prompt(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> str:

    return f"""
Research the current legal requirements for this startup.

Startup: {startup_name}
Idea: {startup_idea}
Location: {location}
Budget: {budget} USD
Sector: {sector}

Find only:

- Recommended business registration
- Required or conditional licenses
- Applicable privacy framework
- Overall legal risk
- Main compliance requirement

RULES:

- Use current information.
- Prefer official government sources.
- Prioritize India and the stated location.
- Check sector-specific requirements.
- Check current central laws.
- Do not use expired schemes or outdated laws.
- Do not invent requirements.
- Maximum 5 bullets.
- Maximum 2 sources.
- No explanations.
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
Analyze this startup's legal position.

Startup:
{startup_name}

Idea:
{startup_idea}

Location:
{location}

Budget:
{budget} USD

Sector:
{sector}

Research:
{research}

Return EXACTLY FIVE values.

RULES:

- No explanations.
- Values must be 1–3 words.
- Registration: Pvt Ltd / LLP / Partnership / N/A
- License: Required / Conditional / Not Required / N/A
- Privacy: DPDP Act / Privacy Policy / N/A
- Legal Risk: Low / Medium / High / N/A
- Compliance: Required / Conditional / Not Required / N/A
- Never invent requirements.
- If uncertain, use N/A.

Return ONLY the required JSON.
"""