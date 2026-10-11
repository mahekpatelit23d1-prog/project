
from prompts.market_prompt import (
    build_research_prompt,
    build_final_prompt
)

from services.web_search_service import search_web
from services.llm_service import generate_structured


MARKET_SCHEMA = {
    "type": "object",
    "properties": {
        "market_size_billion": {
            "type": ["number", "null"]
        },
        "growth_rate": {
            "type": "string"
        },
        "target_users": {
            "type": "string"
        },
        "demand": {
            "type": "string",
            "enum": [
                "High",
                "Medium",
                "Low",
                "N/A"
            ]
        },
        "competition": {
            "type": "string",
            "enum": [
                "High",
                "Medium",
                "Low",
                "N/A"
            ]
        }
    },
    "required": [
        "market_size_billion",
        "growth_rate",
        "target_users",
        "demand",
        "competition"
    ],
    "additionalProperties": False
}


def run_market_agent(
    startup_name: str,
    startup_idea: str,
    location: str,
    budget: str,
    sector: str
) -> dict:

    research_query = build_research_prompt(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector
    )

    research = search_web(research_query)

    final_prompt = build_final_prompt(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector,
        research=research
    )

    result = generate_structured(
        prompt=final_prompt,
        schema=MARKET_SCHEMA,
        cache_key=(
            f"market-v2:"
            f"{startup_name}:"
            f"{startup_idea}:"
            f"{location}:"
            f"{budget}:"
            f"{sector}"
        )
    )

    # Validate the numeric value before passing it to the ML model.
    market_size = result.get("market_size_billion")

    if market_size is not None:
        if (
            isinstance(market_size, bool)
            or not isinstance(market_size, (int, float))
            or market_size < 0
        ):
            result["market_size_billion"] = None

    return result
