const { Given,Then,Before} = require('@cucumber/cucumber');
const { removeSync } = require('fs-extra');
const axios = require('axios');
var expect = require('expect');

let beers_response;
const beers_endpoint = "https://api.punkapi.com/v2/beers/"
const headers = {'Content-Type': 'application/json'}

Before(function () {
  //  removes the report folder before every run to allow for a new clean report to be generated
   removeSync('report/**')
});

    Given('I call the punk api with beer id {string}', async function (beerId) {
      try {
        beers_response = await axios.get(`${beers_endpoint}${beerId}`,{headers:headers}).then((response) => {
          return response
        })
      } catch (err) {
        throw new err
        }
    });

    Then('I expect a {int} status response', async function (statuscode) {
      await expect(beers_response.status).toBe(statuscode)
    });

    Then('The malt is {string}', async function (maltType) {
      await expect(beers_response.data[0].ingredients.malt[0].name).toBe(maltType)
    });

    Then('The malt value is {float} and the unit is {string}', async function (maltValue,unitOfMeasurement) {
      await expect(beers_response.data[0].ingredients.malt[0].amount.value).toBe(maltValue)
      await expect(beers_response.data[0].ingredients.malt[0].amount.unit).toBe(unitOfMeasurement)
    });
