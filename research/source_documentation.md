# Source Documentation

## 1. Purpose

This document defines the requirements for collecting, evaluating, and documenting sources used by the AI-powered startup research agents.

The three AI research agents may research current information about:

1. Market Research Agent: Market size, market growth, competition, customer demand, and industry trends.
2. Legal Agent: Business registration, licenses, regulations, and official legal resources.
3. Funding Agent: Grants, government funding schemes, incubators, eligibility requirements, and application deadlines.

# 2. Why Sources Are Required

AI-generated research should not be treated as automatically correct.
The system should identify the sources used to support important research findings.
Sources help the project team:

* Verify research results.
* Reduce unsupported claims.
* Improve research reliability.
* Explain where information came from.
* Support the final project report.
* Demonstrate responsible use of AI research.

# 3. Types of Sources

The AI research agents may use different types of reliable sources depending on the information being researched.

Examples include:

    ### Government Sources
    Government websites and official government reports can provide information about:

    * Business regulations
    * Economic conditions
    * Industry statistics
    * Population
    * Employment
    * Local business conditions

    ### Official Industry Sources
    Industry associations and official organizations can provide:

    * Industry statistics
    * Market reports
    * Industry trends
    * Regulatory information


    ### Company Sources
    Official company websites can be useful for:

    * Competitor information
    * Product information
    * Pricing information
    * Company announcements
    * Business models

    Company sources should not automatically be treated as neutral sources because companies may present information from their own perspective.

    ### Academic Sources
    Academic papers and research publications may be useful for:

    * Industry trends
    * Customer behavior
    * Technology trends
    * Scientific or technical information

# 4. Source Quality Requirements

AI agents should prefer sources that are:
* Relevant to the research question.
* Recent enough for the topic.
* Credible.
* Directly related to the claim.
* Clearly identifiable.
* Supported by evidence.

The agents should avoid relying heavily on:
* Anonymous websites
* Unverified social media posts
* Random blogs
* AI-generated content without original sources
* Sources with unclear ownership
* Outdated information when current information is required

# 5. Source Recency

Different types of information require different levels of freshness.

For example:

### Current Market Trends

Market Research : Recent sources are preferred for market growth, competition, customer demand, and industry trends.

Legal Information : Current official government and regulatory sources should be preferred.

Funding Information : Current official funding-program sources should be preferred, especially for eligibility criteria, application deadlines, and funding availability.

### Regulations

Official and current government information should be preferred.

### Historical Information

Older sources may be acceptable when the information is historical and has not changed.

The AI agent should consider the date of a source before using it.

# 6. Market Size Sources

Market-size information should be supported by identifiable sources whenever possible.

The agent should record:

* Market name
* Market size
* Year
* Geographic scope
* Source
* Source date or publication year
* Currency
* Unit

Example research record:

Market:
AI Healthcare

Market Size:
$35 billion

Year:
2026

Geographic Scope:
Global

Source:
Identified market research source

Unit:
USD billions

# 7. Market Size Conversion

Market-size values must be normalized before they are sent to the ML model.

The project's ML feature is: market_size_billion

Therefore: $25 billion → 25

If a source reports: $25,000,000,000

the value can be converted to: 25

The original source value should still be preserved in the research information where practical.


# 8. Multiple Sources

For important research findings, the AI agents should preferably compare information from multiple sources.

For example, if two reliable sources provide different market-size estimates, the agent should not silently choose one without considering the difference.

The agent should evaluate:

* Publication date
* Geographic scope
* Market definition
* Research methodology, when available
* Source credibility

# 9. Conflicting Information

Different sources may report different values.
This does not automatically mean that one source is incorrect.

Possible reasons include:

* Different years
* Different geographic regions
* Different definitions of the market
* Different research methodologies
* Different assumptions

The AI agent should identify important differences when they affect the conclusion.

# 10. Source Information in AI Results

Example:

JSON

    {
     "marketResearch": {
       "summary": "Market findings based on available sources",
       "sources": []
    },
    "legal": {
     "summary": "Relevant legal requirements",
     "sources": []
    },
    "funding": {
     "summary": "Relevant funding opportunities",
     "sources": []
  }
}

The exact source structure may be adjusted by the AI-agent developer.

# 11. Research Responsibilities

Market Research Agent : The Market Research Agent should use relevant sources to investigate competitors, customer demand, market conditions, and industry trends.

Legal Agent : The Legal Agent should prioritize official government and regulatory sources for business registration, licenses, and applicable regulations.

Funding Agent :The Funding Agent should prioritize official sources for grants, government funding schemes, incubators, eligibility criteria, and application deadlines.

All agents should identify sources where possible and clearly communicate when information cannot be confirmed.

# 12. Source Recording

For important findings, the system should record enough information to identify the source.

Recommended fields include:

    sourceTitle
    publisher
    publicationDate
    sourceUrl
    researchTopic
    claimSupported

Example:

JSON

    {
    "sourceTitle": "Example Industry Report",
    "publisher": "Example Research Organization",
    "publicationDate": "2026",
    "sourceUrl": "https://example.com/report",
    "researchTopic": "Market Size",
    "claimSupported": "Estimated global market size"
    }

The actual project implementation should use real source information rather than this example.

# 13. Source URL Requirements

When a source is available online, the source URL should be recorded where appropriate.
The URL should point to the relevant source rather than only the organization's homepage.
The project should avoid inventing URLs.
If a source cannot be reliably identified, the AI agent should not create a fake citation.

# 14. AI-Generated Information

The system should distinguish between:

        ### Source-supported information

        Information that can be traced to an external source.

        ### AI interpretation

        The AI agent's analysis or conclusion based on available information.

        For example:

            Source-supported:
            Market growth is reported as approximately 14%.

        AI interpretation:
        The market appears to have strong growth potential.


        The interpretation should not be presented as if it were directly stated by the source.

# 15. Unsupported Claims

The AI agents should not present unsupported information as fact.

If reliable information cannot be found, the agent should report insufficient data.

Example:

JSON

    {
    "status": "insufficient_data",
    "message": "Reliable information could not be confirmed from available sources."
    }

# 16. Source Reliability and Final Results

Source reliability should be considered when producing the final AI research result.

A research result based on several strong sources should generally be treated as more reliable than a result based on a single weak source.

However, the system should avoid creating a false numerical confidence score unless such a score has been properly defined and implemented.

# 17. Research Date

Because market information changes over time, the research date should be recorded where possible.

Example:

    Research Date:
    2026-10-07

This helps the final project documentation explain when the research was performed.

# 18. ML Dataset Sources

The ML model uses the project's provided startup prediction dataset.

The dataset contains:

                100,000 rows
                6 columns

The ML target variable is: Success

The ML features are:

    founder_experience_years
    team_size
    market_size_billion
    sector
    founder_background

The dataset documentation should be used as the primary reference for the ML data structure.

# 19. Difference Between Dataset and AI Research Sources

The ML dataset and AI research sources have different purposes.

### ML Dataset

Used to train the prediction model.

The model learns patterns from the historical/project dataset.

### AI Research Sources

Used by the AI agents to obtain current external information.

The agents research changing market and business information.

These two sources should not be confused.

# 20. Important Architecture Rule

AI research should not automatically modify or retrain the ML model.

For example:

  Current market research
            ↓
        AI Agents
            ↓
     marketSizeBillion
            ↓
      ML Prediction

The researched market size can be used as an input to the already-trained ML model.

# 21. Research Documentation for Final Report

The final project report should document:

* What information was researched.
* Which of the three AI agents performed the research.
* What source types each agent used.
* How source reliability and recency were considered.
* What types of sources were used.
* How source reliability was considered.
* How market size was normalized.
* How current information was separated from ML training data.
* How unsupported information was handled.
* When research was performed.

# 22. Final Source Documentation Requirement

The AI research component should provide traceable and reasonably reliable information rather than unsupported AI-generated claims.

The system should:
* Prefer credible sources.
* Consider source recency.
* Record important source information.
* Avoid fabricated citations.
* Handle conflicting information carefully.
* Clearly distinguish source information from AI interpretation.
* Report insufficient information when reliable evidence cannot be found.
* Preserve market-size units correctly.
* Keep AI research separate from ML model training.

These requirements should be followed by the AI-agent implementation team and verified during integration testing.
