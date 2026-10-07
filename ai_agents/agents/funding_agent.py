from prompts.funding_prompt import (
    build_research_prompt,
    build_final_prompt
)

from services.web_search_service import search_web
from services.llm_service import generate_structured


FUNDING_SCHEMA = {
    "type": "object",

    "properties": {

        "funding_required": {
            "type": "string"
        },

        "funding_stage": {
            "type": "string"
        },

        "investors": {
            "type": "string"
        },

        "grants": {
            "type": "string"
        },

        "runway": {
            "type": "string"
        }
    },

    "required": [
        "funding_required",
        "funding_stage",
        "investors",
        "grants",
        "runway"
    ],

    "additionalProperties": False
}


def run_funding_agent(
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

    research = search_web(
        research_query
    )

    final_prompt = build_final_prompt(
        startup_name=startup_name,
        startup_idea=startup_idea,
        location=location,
        budget=budget,
        sector=sector,
        research=research
    )

    return generate_structured(
        prompt=final_prompt,
        schema=FUNDING_SCHEMA,
        cache_key=(
            f"funding:"
            f"{startup_name}:"
            f"{startup_idea}:"
            f"{location}:"
            f"{budget}:"
            f"{sector}"
        )
    )