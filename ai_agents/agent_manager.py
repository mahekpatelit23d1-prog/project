from agents.market_agent import run_market_agent
from agents.funding_agent import run_funding_agent
from agents.legal_agent import run_legal_agent


def run_all_agents(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> dict:

    results = {}

    agents = {
        "market": run_market_agent,
        "funding": run_funding_agent,
        "legal": run_legal_agent
    }

    for agent_name, agent_function in agents.items():
        try:
            results[agent_name] = agent_function(
                startup_name=startup_name,
                startup_idea=startup_idea,
                location=location,
                budget=budget,
                sector=sector
            )
        except Exception as error:
            results[agent_name] = {
                "error": f"{agent_name.capitalize()} agent failed",
                "details": str(error)
            }

    return results
