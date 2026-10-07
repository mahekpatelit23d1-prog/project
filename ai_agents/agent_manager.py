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

    market_result = run_market_agent(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector
    )

    funding_result = run_funding_agent(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector
    )

    legal_result = run_legal_agent(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector
    )

    return {
        "market": market_result,
        "funding": funding_result,
        "legal": legal_result
    }