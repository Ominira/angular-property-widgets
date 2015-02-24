/**
* Module: Mortgage Calculation
*
* Description: This is an AngularJS module for calculating a mortgage loan
*/
(function () {
  // body..
  'use strict';

  /**
    * Config
    */
  var moduleName = 'dirMortgage';

  /**
    * Module
    */
  var module;
  try {
    module = angular.module(moduleName);
  } catch (err) {
    // named module doesn't exist, so create one
    module = angular.module(moduleName, ['ng']);
  }

  module.directive('dirMortgage', function ($parse, dirMortgageService, mortgageCalculator) {
    // Runs during compile
    return {
      restrict: 'AE',
      scope: true,
      replace: true,
      templateUrl: function(elem, attrs) {
        return attrs.dmTemplateUrl || dirMortgageService.getTemplatePath();
      },
      compile: function () {
        return function postCompile (scope, element, attrs) {
          var principal = $parse(attrs.dmPrincipalAmount)(scope) || attrs.dmPrincipalAmount || 0;
          scope.loan = {
            downPayment: 0,
            principal:  parseFloat(principal) || dirMortgageService.getDefaultPrincipalAmount(),
            years: parseFloat(attrs.dmMinYear) || dirMortgageService.getMinYear(),
            months: (dirMortgageService.getMinYear() * 12),
            rate: parseFloat(attrs.dmDefaultRate) || dirMortgageService.getDefaultRate(),
            startDate: new Date(),
            monthlyPayments: 0,
            payOffDate: ''
          };
          scope.defaults = {
            minRate: parseFloat(attrs.dmMinRate) || dirMortgageService.getMinRate(),
            maxRate: parseFloat(attrs.dmMaxRate) || dirMortgageService.getMaxRate(),
            minYear: parseFloat(attrs.dmMinYear) || dirMortgageService.getMinYear(),
            maxYear: parseFloat(attrs.dmMaxYear) || dirMortgageService.getMaxYear(),
            stepRate: parseFloat(attrs.dmStepRate) || dirMortgageService.getStepRate(),
            stepYear: parseFloat(attrs.dmStepYear) || dirMortgageService.getStepYear(),
            currency: attrs.dmCurrency || dirMortgageService.getCurrency()
          };

          scope.$watch(function(){
            return scope.loan;
          }, function(nv){
            if(nv.years){
              scope.loan.months = parseFloat((nv.years * 12).toFixed(0));
            }
          }, true);

          scope.calculate = function () {
            mortgageCalculator.calculate(scope.loan);
          };
        }
      }
    };
  });

  module.service('mortgageCalculator', [function () {
    this.calculate = function (loan) {
      var principal;
      if (loan.downPayment && loan.principal > 0) {
        principal = (loan.principal - loan.downPayment);
      } else {
        principal = loan.principal;
      }
      var interestRatePerMonth = ((loan.rate / 100) / 12)
      var term = Math.pow((1 + interestRatePerMonth), loan.months);
      try {
        loan.monthlyPayments = (principal * ((interestRatePerMonth * term) / (term - 1)));
        this.overrideDate();
        loan.payOffDate = (new Date(loan.startDate).addMonths(loan.months))
      } catch (err) {
        throw 'Loan Calculation Exception: ' + err;
      }
    };
    this.overrideDate = function () {
      //to handle possible future edge cases, let's overridate with this functions
      //stripped and modified from datejs
      Date.isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
      };
      Date.getDaysInMonth = function (year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      };
      Date.prototype.isLeapYear = function () {
        return Date.isLeapYear(this.getFullYear());
      };
      Date.prototype.getDaysInMonth = function() {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
      };
      Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
      }
    };
  }]);

  module.provider('dirMortgageService', function () {
    var dirMortgageValues = {
      templatePath: 'scripts/modules/dirMortgage/templates/dirMortgage.tpl.html',
      minYear: 1,
      maxYear: 30,
      stepYear: 0.1,
      minRate: 0.5,
      maxRate: 10,
      stepRate: 0.1,
      defaultRate: 4.0,
      defaultPrincipalAmount: 0.0,
      currency: '$'
    };
    this.setPath = function (path) {
      dirMortgageValues.templatePath = path;
    };
    this.setMinYear = function (year) {
      dirMortgageValues.minYear = year;
    };
    this.setMaxYear = function (year) {
      dirMortgageValues.maxYear = year;
    };
    this.setStepYear = function (steps) {
      dirMortgageValues.stepYear = steps;
    };
    this.setMinRate = function (rate) {
      dirMortgageValues.minRate = rate;
    };
    this.setMaxRate = function (rate) {
      dirMortgageValues.maxRate = rate;
    };
    this.setStepRate = function (steps) {
      dirMortgageValues.stepRate = steps;
    };
    this.setDefaultRate = function (rate) {
      dirMortgageValues.defaultRate = rate;
    };
    this.setDefaultPrincipalAmount = function (amount) {
      dirMortgageValues.defaultPrincipalAmount = amount;
    };
    this.setCurrency = function (currency) {
      dirMortgageValues.currency = currency;
    };
    this.$get = function () {
      return {
        getTemplatePath: function () {
          return dirMortgageValues.templatePath;
        },
        getMinYear: function () {
          return dirMortgageValues.minYear;
        },
        getMaxYear: function () {
          return dirMortgageValues.maxYear;
        },
        getMinRate: function () {
          return dirMortgageValues.minRate;
        },
        getMaxRate: function () {
          return dirMortgageValues.maxRate;
        },
        getDefaultRate: function () {
          return dirMortgageValues.defaultRate;
        },
        getDefaultPrincipalAmount: function () {
          return parseFloat(dirMortgageValues.defaultPrincipalAmount);
        },
        getStepRate: function () {
          return dirMortgageValues.stepRate;
        },
        getStepYear: function () {
          return dirMortgageValues.stepYear;
        },
        getCurrency: function () {
          return dirMortgageValues.currency;
        }
      };
    };
  });

})();
