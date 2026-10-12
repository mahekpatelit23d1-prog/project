import json
import os

from dotenv import load_dotenv
from groq import Groq

from services.cache_service import get_cached, set_cached

# Load environment variables from .env
load_dotenv()

# Groq model configuration
GROQ_MODEL = "openai/gpt-oss-120b"

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY is missing. "
        "Please configure it in your .env file."
    )

# Initialize Groq client
groq_client = Groq(api_key=GROQ_API_KEY)


def get_client():
    """Return the initialized Groq client."""
    return groq_client


def generate_structured(
    prompt: str,
    schema: dict,
    cache_key: str
) -> dict:
    """
    Generate structured JSON using Groq.

    Checks the cache first. If no cached response exists,
    calls Groq and saves the result in the cache.

    Args:
        prompt: Prompt for the AI agent.
        schema: JSON schema for the expected response.
        cache_key: Unique identifier for the request.

    Returns:
        A dictionary containing the structured AI response.

    Raises:
        RuntimeError: If Groq generation or response parsing fails.
    """

    # Prepare cache key data
    cache_data = {
        "task": cache_key,
        "prompt": prompt,
        "schema": schema,
        "groq_model": GROQ_MODEL
    }

    # 1. Check cache
    try:
        cached = get_cached(cache_data)

        if cached is not None:
            print("Cache hit")
            return json.loads(cached)

    except Exception as error:
        print(f"Cache read failed: {error}")
        print("Continuing with Groq")

    # 2. Generate response using Groq
    try:
        print("Using Groq")

        response = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "compact_agent_output",
                    "strict": True,
                    "schema": schema
                }
            },
            reasoning_effort="low",
            max_completion_tokens=500
        )

        # Extract response content
        content = response.choices[0].message.content

        if not content:
            raise ValueError(
                "Groq returned an empty response."
            )

        # Parse JSON
        result = json.loads(content)

        if not isinstance(result, dict):
            raise ValueError(
                "Groq response must be a JSON object."
            )

    except Exception as error:
        raise RuntimeError(
            f"Groq generation failed: {error}"
        ) from error

    # 3. Save response to cache
    try:
        set_cached(
            cache_data,
            json.dumps(
                result,
                ensure_ascii=False
            )
        )
        print("Response cached")

    except Exception as error:
        # A cache write failure should not discard
        # a successfully generated response.
        print(f"Cache write failed: {error}")

    # 4. Return structured result
    return result