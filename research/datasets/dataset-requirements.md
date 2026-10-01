# Dataset Requirements 

## Project 

AI-Powered Startup Analysis System 

## Purpose 
Identify and document datasets that may be useful for the startup analysis and machine-learning prediction components of the project. 

## Requirements 

- Relevant to startups or business analysis 
- Reliable source 
- Clear description of the data 
- Understandable columns/features 
- Suitable for machine-learning analysis 
- Appropriate licensing or usage conditions 

## Dataset Candidates | Dataset | Source |    Purpose     | Important Features | 
  
          1             Indian    Kaggle   Analyze Indian   Date,startup name,
                       Startup            startup funding   industry,sub-vertical,
                       Funding                patterns      city,investors,funding
                                                            amount,date
          2             Indian    Public      Analyze      Company,                      
                       unicorn    dataset     Indian       sector,entry valuation,
                       startups               startup      current valuation,entry
                         2023                              year,location,,investors

          3             Startup    Team       Predict      Funding rounds,team size,
                      Prediction  provided    Startup      revenue,market size,etc.
                                   excel      success


## Target variable |    Size         |  Licence    |   Notes

Funding amount       3044 rows,        CC0/Public    Useful for Indian startup/
                     10 variables       domain       funding analysis, but relatively old

current valuation    102 rows,           to be       Useful for studying Indian Unicorns,
                     8 variable         verified     relatively small datasets
                                                    (102 rows*8 variables)

    Success          100000 rows,        team-        No missing and duplicate rows
                     15 columns         craeted

## Dataset Comparison 

### Indian Startup Funding 

- 3,044 records and 10 variables. 
- Contains funding date, startup name, industry, city, investors, investment type, and funding amount. 
- Kaggle lists the dataset license as CC0: Public Domain. 
- Data covers Indian startup funding records and can support analysis of funding patterns. 
- The prediction target would need to be defined with the team. 

### Indian Unicorn Startups 2023 

- 102 records and 8 variables. 
- Contains sector, entry valuation, current valuation, entry year, location, and selected investors. 
- Current valuation could potentially be used as a target variable. 
- The dataset is relatively small, so this should be considered when evaluating it for machine learning. 
- License still needs to be verified from the original dataset source.

## Startup Prediction (Current Dataset)

- Reference Dataset
- Startup Prediction Dataset is currently being used for the project because it contains 100,000 records, a clearly defined 'Success' target, relevant startup features, and no missing or duplicate rows.

-The dataset contains numerical and categorical features that can be investigated for startup success prediction.

## Dataset Selection Criteria 

A suitable dataset should be evaluated based on : 
1. Relevance to the project. 
2. Number of records. 
3. Number and quality of features. 
4. Availability of a suitable target variable. 
5. Data quality and completeness. 
6. Source reliability. 
7. Dataset license. 
8. Suitability for machine learning.