import json
import os

from dotenv import load_dotenv
from groq import Groq
from ollama import chat as ollama_chat

from services.cache_service import (
    get_cached,
    set_cached
)


load_dotenv()


GROQ_MODEL = "openai/gpt-oss-120b"
OLLAMA_MODEL = "llama3.2"


GROQ_API_KEY = os.getenv("GROQ_API_KEY")


if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY is missing from .env"
    )


groq_client = Groq(
    api_key=GROQ_API_KEY
)


def get_client():
    return groq_client


def generate_structured(
    prompt: str,
    schema: dict,
    cache_key: str
) -> dict:

    cache_data = {
        "task": cache_key,
        "prompt": prompt,
        "schema": schema,
        "groq_model": GROQ_MODEL,
        "ollama_model": OLLAMA_MODEL
    }

    # ============================================================
    # 1. CACHE
    # ============================================================

    cached = get_cached(cache_data)

    if cached is not None:
        print("✅ Cache")
        return json.loads(cached)

    # ============================================================
    # 2. GROQ PRIMARY
    # ============================================================

    try:

        print("⚡ Groq")

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
            max_completion_tokens=100
        )

        content = response.choices[0].message.content

        result = json.loads(content)

        set_cached(
            cache_data,
            json.dumps(
                result,
                ensure_ascii=False
            )
        )

        return result

    except Exception as error:

        print("⚠️ Groq unavailable")
        print(f"   {error}")
        print("🛟 Ollama")

    # ============================================================
    # 3. OLLAMA BACKUP
    # ============================================================

    try:

        response = ollama_chat(
            model=OLLAMA_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            format=schema,
            options={
                "temperature": 0,
                "num_predict": 100
            }
        )

        result = json.loads(
            response.message.content
        )

        set_cached(
            cache_data,
            json.dumps(
                result,
                ensure_ascii=False
            )
        )

        return result

    except Exception as error:

        raise RuntimeError(
            "Groq and Ollama both failed.\n"
            f"Ollama error: {error}"
        )