Feature: Validating api requests for Beer beverages

Scenario: Validating the Punk API for malt beer
  Given I call the punk api with beer id "192"
  Then I expect a 200 status response
  And The malt is "Extra Pale"
  And The malt value is 5.3 and the unit is "kilograms"
