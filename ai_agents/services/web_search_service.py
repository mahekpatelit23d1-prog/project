from services.llm_service import (
    get_client,
    GROQ_MODEL
)

from services.cache_service import (
    get_cached,
    set_cached
)


client = get_client()


def search_web(query: str) -> str:

    cache_data = {
        "service": "web_search",
        "query": query
    }

    # ============================================================
    # CACHE
    # ============================================================

    cached = get_cached(cache_data)

    if cached is not None:
        print("✅ Cached research")
        return cached

    # ============================================================
    # GROQ WEB SEARCH
    # ============================================================

    print("🔎 Groq Search")

    prompt = f"""
{query}

RULES:

- Use current information.
- Maximum 5 bullets.
- Maximum 10 words per bullet.
- Maximum 2 useful sources.
- No paragraphs.
- No explanations.
- Do not invent facts.
"""

    try:

        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            tools=[
                {
                    "type": "browser_search"
                }
            ],
            tool_choice="required",
            reasoning_effort="low",
            max_completion_tokens=600
        )

        result = response.choices[0].message.content

        if not result:
            raise RuntimeError(
                "Empty web-search response."
            )

        set_cached(
            cache_data,
            result
        )

        return result

    except Exception as error:

        print("⚠️ Groq search unavailable")
        print(f"   {error}")

        cached = get_cached(cache_data)

        if cached is not None:
            print("✅ Using cached research")
            return cached

        return (
            "Current web research unavailable. "
            "Do not invent current information."
        )