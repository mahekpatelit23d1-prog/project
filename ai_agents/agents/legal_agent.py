from prompts.legal_prompt import (
    build_research_prompt,
    build_final_prompt
)

from services.web_search_service import search_web
from services.llm_service import generate_structured


LEGAL_SCHEMA = {
    "type": "object",

    "properties": {
        "registration": {
            "type": "string",
            "enum": [
                "Pvt Ltd",
                "LLP",
                "Partnership",
                "N/A"
            ]
        },

        "license": {
            "type": "string",
            "enum": [
                "Required",
                "Conditional",
                "Not Required",
                "N/A"
            ]
        },

        "privacy": {
            "type": "string",
            "enum": [
                "DPDP Act",
                "Privacy Policy",
                "N/A"
            ]
        },

        "legal_risk": {
            "type": "string",
            "enum": [
                "Low",
                "Medium",
                "High",
                "N/A"
            ]
        },

        "compliance": {
            "type": "string",
            "enum": [
                "Required",
                "Conditional",
                "Not Required",
                "N/A"
            ]
        }
    },

    "required": [
        "registration",
        "license",
        "privacy",
        "legal_risk",
        "compliance"
    ],

    "additionalProperties": False
}


def run_legal_agent(
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
        schema=LEGAL_SCHEMA,
        cache_key=(
            f"legal:"
            f"{startup_name}:"
            f"{startup_idea}:"
            f"{location}:"
            f"{budget}:"
            f"{sector}"
        )
    )