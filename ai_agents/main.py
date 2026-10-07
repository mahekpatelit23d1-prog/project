from agent_manager import run_all_agents


def print_market(data: dict) -> None:
    print("\n📈 MARKET AGENT")
    print(f"• Market Size: {data['market_size']}")
    print(f"• Growth Rate: {data['growth_rate']}")
    print(f"• Target Users: {data['target_users']}")
    print(f"• Demand: {data['demand']}")
    print(f"• Competition: {data['competition']}")


def print_funding(data: dict) -> None:
    print("\n💰 FUNDING AGENT")
    print(f"• Funding Required: {data['funding_required']}")
    print(f"• Funding Stage: {data['funding_stage']}")
    print(f"• Investors: {data['investors']}")
    print(f"• Grants: {data['grants']}")
    print(f"• Runway: {data['runway']}")


def print_legal(data: dict) -> None:
    print("\n⚖️ LEGAL AGENT")
    print(f"• Registration: {data['registration']}")
    print(f"• License: {data['license']}")
    print(f"• Privacy: {data['privacy']}")
    print(f"• Legal Risk: {data['legal_risk']}")
    print(f"• Compliance: {data['compliance']}")


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

print_market(result["market"])
print_funding(result["funding"])
print_legal(result["legal"])

print("\n✅ All 3 agents completed.")