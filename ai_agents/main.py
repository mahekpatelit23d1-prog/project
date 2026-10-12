from agent_manager import run_all_agents


def print_market(data: dict) -> None:
    print("\n📈 MARKET AGENT")

    if "error" in data:
        print(f"• Error: {data['error']}")
        return

    market_size = data.get("market_size_billion")

    if market_size is not None:
        print(f"• Market Size: ${market_size}B USD")
    else:
        print("• Market Size: N/A")

    print(f"• Growth Rate: {data.get('growth_rate', 'N/A')}")
    print(f"• Target Users: {data.get('target_users', 'N/A')}")
    print(f"• Demand: {data.get('demand', 'N/A')}")
    print(f"• Competition: {data.get('competition', 'N/A')}")


def print_funding(data: dict) -> None:
    print("\n💰 FUNDING AGENT")

    if "error" in data:
        print(f"• Error: {data['error']}")
        return

    print(f"• Funding Required: {data.get('funding_required', 'N/A')}")
    print(f"• Funding Stage: {data.get('funding_stage', 'N/A')}")
    print(f"• Investors: {data.get('investors', 'N/A')}")
    print(f"• Grants: {data.get('grants', 'N/A')}")
    print(f"• Runway: {data.get('runway', 'N/A')}")


def print_legal(data: dict) -> None:
    print("\n⚖️ LEGAL AGENT")

    if "error" in data:
        print(f"• Error: {data['error']}")
        return

    print(f"• Registration: {data.get('registration', 'N/A')}")
    print(f"• License: {data.get('license', 'N/A')}")
    print(f"• Privacy: {data.get('privacy', 'N/A')}")
    print(f"• Legal Risk: {data.get('legal_risk', 'N/A')}")
    print(f"• Compliance: {data.get('compliance', 'N/A')}")


def main() -> None:
    result = run_all_agents(
        startup_name="GreenRide",
        startup_idea="Affordable electric scooter rental for students",
        location="Surat, Gujarat, India",
        budget="2000000",
        sector="Climate"
    )

    print("\n" + "=" * 50)
    print("🚀 AI STARTUP ASSISTANT")
    print("=" * 50)

    print_market(result.get("market", {}))
    print_funding(result.get("funding", {}))
    print_legal(result.get("legal", {}))

    failed = any(
        "error" in result.get(agent, {})
        for agent in ("market", "funding", "legal")
    )

    if failed:
        print("\n⚠️ One or more agents failed. Check the errors above.")
    else:
        print("\n✅ All 3 agents completed.")


if __name__ == "__main__":
    main()
