import hashlib
import json
from pathlib import Path


CACHE_DIR = Path("cache")
CACHE_FILE = CACHE_DIR / "llm_cache.json"


def _ensure_cache() -> None:
    CACHE_DIR.mkdir(exist_ok=True)

    if not CACHE_FILE.exists():
        CACHE_FILE.write_text(
            "{}",
            encoding="utf-8"
        )


def _make_key(key_data: dict) -> str:
    raw = json.dumps(
        key_data,
        sort_keys=True,
        ensure_ascii=False
    )

    return hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()


def get_cached(key_data: dict):
    _ensure_cache()

    data = json.loads(
        CACHE_FILE.read_text(encoding="utf-8")
    )

    key = _make_key(key_data)

    return data.get(key)


def set_cached(key_data: dict, value: str) -> None:
    _ensure_cache()

    data = json.loads(
        CACHE_FILE.read_text(encoding="utf-8")
    )

    key = _make_key(key_data)

    data[key] = value

    CACHE_FILE.write_text(
        json.dumps(
            data,
            indent=2,
            ensure_ascii=False
        ),
        encoding="utf-8"
    )