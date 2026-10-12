from services.llm_service import get_client, GROQ_MODEL
from services.cache_service import get_cached, set_cached


client = get_client()


def search_web(query: str) -> str:
    """
    Search for current information using Groq web search.

    Returns cached research when available.
    If search fails, returns a clear message rather than
    inventing current facts.
    """

    cache_data = {
        "service": "web_search",
        "query": query,
        "model": GROQ_MODEL
    }

    # 1. Check cache
    try:
        cached = get_cached(cache_data)

        if cached is not None:
            print("Cached research")
            return cached

    except Exception as error:
        print(f"Cache read failed: {error}")

    # 2. Perform Groq web search
    print("Searching with Groq")

    prompt = f"""
{query}

RULES:
- Use current, reliable information.
- Maximum 5 concise bullets.
- Maximum 10 words per bullet.
- Maximum 2 useful sources.
- Prefer official or reputable sources.
- Include source names or URLs when available.
- Do not invent facts, statistics, or sources.
- If information cannot be verified, state N/A.
- No long explanations.
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
                {"type": "browser_search"}
            ],
            tool_choice="required",
            reasoning_effort="low",
            max_completion_tokens=600
        )

        result = response.choices[0].message.content

        if not result:
            raise RuntimeError(
                "Groq returned an empty web-search response."
            )

        # 3. Cache research
        try:
            set_cached(cache_data, result)
        except Exception as error:
            print(f"Cache write failed: {error}")

        return result

    except Exception as error:
        print(f"Groq web search failed: {error}")

        # Use previously cached research if available
        try:
            cached = get_cached(cache_data)

            if cached is not None:
                print("Using cached research")
                return cached
        except Exception as cache_error:
            print(f"Cache read failed: {cache_error}")

        return (
            "Current web research unavailable. "
            "Do not invent current information."
        )
