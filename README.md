# Angular Property Investment Widgets (dirProperty)
Usable angular widgets for transactions in properties development and investments

#### Installation

```javascript

bower install angular-property-widget

var app = angular.module('yourAppName',['dirProperty'])

```

## Directive: dirMortgage
Angular directive for calculating mortgage loans...

##### Disclaimer: Not a fan/advocate of interest rates in any financial/commercial transactions

### How to use  

#### Basic Example

```html
<div dir-mortgage></div>

or

<dir:mortgage></dir:mortgage>

with extra attributes

<dir:mortgage dm-template-url="" dm-principal-amount="160000"></dir:mortgage>

```

- Other usable attributes

```
dmTemplateUrl - template url
dmPrincipalAmount - prinicipal amount/mortgage amount
dmDefaultRate - default interest rate per annum
dmMinRate - minimum interest rate per annum
dmMaxRate - maximum interest rate per annum
dmMinYear - minimum year term
dmMaxYear - maximum year term
dmStepRate - defined increment pattern for interest rate values e.g. 0.5, 0.2, 1
dmStepYear - defined increment pattern of years increase, see values above
dmCurrency - set locale currency

```

#### Configs

- Setting attributes could also be done through a provider

```javascript
var app = angular.module('yourAppName',['dirProperty']);
app.config(function(dirMortgageServiceProvider){
  dirMortgageServiceProvider.setTemplatePath('/path/to/template');
});

```
- other usable provider setter functions

```javascript

  .setMinYear(float number)
  .setMaxYear(float number)
  .setStepYear(float number)
  .setMinRate(float number)
  .setMaxRate(float number)
  .setStepRate(float number)
  .setDefaultRate(float number)
  .setDefaultPrincipalAmount(float number)
  .setCurrency(string)

```

### More Details

#### Setting Template Path

By default the template path as been set to, and can be found in:

```
  templates/dirMortgage.tpl.html

```

To rewrite or modify template, please do take a cue from the default one provided, 
with regards to scope vars and actions.

#### Default Minimum and Maximum Values

- min year = 1
- max year = 30
- min rate = 0.5
- max rate = 10
- default rate = 4
- step rate (step for interest rate increment) = 0.1
- step year (step for year increase) = 0.1
- currency = '$'
- principal amount = 0.0

All, as depicted above, can be modified through the ```dirMortgageServiceProvider``` mutator methods, or added as attributes when implementing the directive

## Directive: dirRentals
Angular directive for calculate house rent & utilities per square metric unit...

