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
  var moduleName = 'dirProperty';

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

  module.directive('dirMortgage', function ($parse, dirMortgageService, computeEngine, $log) {
    // Runs during compile
    return {
      restrict: 'AE',
      scope: true,
      replace: true,
      templateUrl: function (elem, attrs) {
        $log.debug(elem);
        return attrs.dmTemplateUrl || dirMortgageService.getTemplatePath();
      },
      compile: function () {
        return function postCompile(scope, element, attrs) {
          var principal = $parse(attrs.dmPrincipalAmount)(scope) || attrs.dmPrincipalAmount || 0;
          scope.loan = {
            downPayment: 0,
            principal:  parseFloat(principal) || dirMortgageService.getDefaultPrincipalAmount(),
            years: parseFloat(attrs.dmDefaultYear) || parseFloat(attrs.dmMinYear) || dirMortgageService.getMinYear(),
            months: 0,
            inMonths: parseFloat((dirMortgageService.getMinYear() * 12)),
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

          scope.$watch(function () {
            return scope.loan;
          }, function (nv) {
            if (nv.years > 0) {
              nv.months = 0;
              scope.loan.inMonths = parseFloat((nv.years * 12).toFixed(0));
            } else if (nv.months) {
              nv.years = 0;
            }
            scope.calculate();
          }, true);

          scope.calculate = function () {
            computeEngine.calculateMortgage(scope.loan);
          };

          scope.focusYear = function () {
            if (scope.loan.months > 0) {
              scope.loan.months = 0;
              scope.loan.years = 1;
            }
          };

          scope.focusMonth = function () {
            if (scope.loan.years > 0) {
              scope.loan.years = 0;
              scope.loan.months = 12;
            }
          };

          $log.debug(element);
        };
      }
    };
  });

  module.directive('dirRentals', function ($log, $parse, computeEngine, dirRentalService) {
    return {
      restrict: 'AE',
      scope: true,
      replace: true,
      templateUrl: function (elem, attrs) {
        $log.debug(elem);
        return attrs.drTemplateUrl || dirRentalService.getTemplatePath();
      },
      compile: function () {
        return function postCompile(scope, element, attrs) {
          scope.rentals = {
            deposit: $parse(attrs.drDepositAmount)(scope) || attrs.drDepositAmount || 0,
            depositTerms: $parse(attrs.drDepositTerms)(scope) || attrs.drDepositTerms || 0,
            utilities: $parse(attrs.drUtilitiesFee)(scope) || attrs.drUtilitiesFee || 0,
            estimatedSizeUtils: $parse(attrs.drEstimatedSizeUtils)(scope) || attrs.drEstimatedSizeUtils || 0,
            rents: $parse(attrs.drRent)(scope) || attrs.drRent || 0,
            sizes: $parse(attrs.drSize)(scope) || attrs.drSize || 0,
            roomWidth: $parse(attrs.drRoomWidth)(scope) || attrs.drRoomWidth || 0.00,
            roomDepth: $parse(attrs.drRoomDepth)(scope) || attrs.drRoomDepth || 0.00,
            unitOfMeasure: $parse(attrs.drUnitOfMeasure)(scope) || attrs.drUnitOfMeasure || dirRentalService.getUnitOfMeasures()[0],
            optUnitOfMeasure: $parse(attrs.drOptUnitOfMeasure)(scope) || attrs.drOptUnitOfMeasure || dirRentalService.getUnitOfMeasures(),
            totalRoomSize: 0,
            totalRentAmount: 0,
            duration: $parse(attrs.drDuration)(scope) || attrs.drDuration || "month",
            unitRent: 0,
            unitUtilities: 0
          };

          scope.defaults = {
            currency: $parse(attrs.drCurrency)(scope) || attrs.drCurrency || "$"
          };

          scope.$watch(function () {
            return scope.rentals;
          }, function (nv) {
            // if (nv.totalRoomSize) {
            //   var units = nv.optUnitOfMeasure.filter(function (unit) {
            //     return unit !== nv.unitOfMeasure;
            //   });
            //   nv.otherUnitSizes = computeEngine.getUnitsMeasurements(units, nv);
            // }
            scope.calculate();
          }, true);

          scope.calculate = function () {
            computeEngine.calculateRent(scope.rentals);
          };
          $log.debug(element);
        };
      }
    };
  });

  module.factory('computeEngine', ['dirRentalService', function (dirRentalService) {
    var service = {};
    service.calculateMortgage = function (loan) {
      var principal;
      var month = loan.months > 0 ? loan.months : loan.inMonths;
      if (loan.downPayment && loan.principal > 0) {
        principal = (loan.principal - loan.downPayment);
      } else {
        principal = loan.principal;
      }
      var interestRatePerMonth = ((loan.rate / 100) / 12);
      var term = Math.pow((1 + interestRatePerMonth), month);
      try {
        loan.monthlyPayments = (principal * ((interestRatePerMonth * term) / (term - 1)));
        service.overrideDate();
        loan.payOffDate = (new Date(loan.startDate).addMonths(month));
      } catch (err) {
        throw 'Loan Calculation Exception: ' + err;
      }
    };
    service.calculateRent = function (rent) {
      try {
        var key;
        for (key in rent) {
          if (rent.hasOwnProperty(key) && Number(rent[key])) {
            parseFloat(rent[key]);
          }
        }
      } catch (e) {
        console.log("exception: ", e);
      }

      rent.unitUtilities = (rent.utilities/rent.sizes).toFixed(2);
      rent.unitRent = (rent.rents/rent.sizes).toFixed(2);
      rent.deposit = (rent.depositTerms * rent.rents);
      rent.totalRentAmount = (rent.rents + rent.deposit + rent.utilities);
      //rent.totalRoomSize = (rent.roomWidth * rent.roomDepth).toFixed(4);
    };
    service.getUnitsMeasurements = function (units, rental) {
      var conversions = dirRentalService.getConversionUnits();
      var unitConversions = {};
      units.forEach(function (unit) {
        unitConversions[unit] = service.calculateUnits(conversions[rental.unitOfMeasure], unit, rental);
      });
      return unitConversions;
    };
    service.calculateUnits = function (unitConversions, unit, rental) {
      var unitOfMeasures = dirRentalService.getUnitOfMeasures();
      var returnValue, selectedUnit = rental.unitOfMeasure;
      if (~[unitOfMeasures[0],unitOfMeasures[1]].indexOf(selectedUnit)) {
        returnValue = ((rental.roomWidth * unitConversions[unit]) * (rental.roomDepth * unitConversions[unit]));
      } else if (selectedUnit === unitOfMeasures[2]) {
        if(~[unitOfMeasures[0],unitOfMeasures[1]].indexOf(unit)) {
          returnValue = ((rental.roomDepth / unitConversions[unit]) * (rental.roomWidth / unitConversions[unit]));
        } else if (unit === unitOfMeasures[3]) {
          returnValue = ((rental.roomWidth * unitConversions[unit]) * (rental.roomDepth * unitConversions[unit]));
        } else if (unit === unitOfMeasures[4]) {
          returnValue = (((rental.roomDepth / unitConversions[unit]) * 100) * ((rental.roomWidth / unitConversions[unit]) * 100));
        }
      } else if (~[unitOfMeasures[3],unitOfMeasures[4]].indexOf(selectedUnit)) {
        returnValue = ((rental.roomDepth / unitConversions[unit]) * (rental.roomWidth * unitConversions[unit]));
      }

      return returnValue.toFixed(4);
    };
    service.overrideDate = function () {
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
      Date.prototype.getDaysInMonth = function () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
      };
      Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
      };
    };
    return service;
  }]);

  module.provider('dirRentalService', function () {
    var unitOfMeasureOptions = ['metres', 'yards', 'feet', 'inches', 'centimetres'];
    var templatePath = '../templates/dirRentals-v2.tpl.html';
    this.setUnitOfMeasures = function (options) {
      unitOfMeasureOptions = options.split(', ');
    };
    this.setTemplatePath = function (path) {
      templatePath = path;
    };
    this.$get = function () {
      return {
        getUnitOfMeasures: function () {
          return unitOfMeasureOptions;
        },
        getTemplatePath: function () {
          return templatePath;
        },
        getConversionUnits: function () {
          return {
            metres: {
              yards: 1.09361296,
              feet: (3 * 1.09361296),
              inches: (12 * 3 * 1.09361296),
              centimetres: 100
            },
            yards: {
              metres: 0.9144,
              feet: 3,
              inches: (12 * 3),
              centimetres: (1000 * 0.9144)
            },
            feet: {
              inches: 12,
              yards: 3,
              metres: 3.28084,
              centimetres: 3.28084, // to be multiplied by 100 after serving as divisor
            },
            inches: {
              yards: 36,
              feet: 12,
              metres: 39.3700787,
              centimetres: 0.393700787
            },
            centimetres: {
              metres: 100,
              inches: 2.54,
              feet: 30.48,
              yards: 91.44
            }
          };
        }
      };
    };
  });

  module.provider('dirMortgageService', function () {
    var dirMortgageValues = {
      templatePath: '../templates/dirMortgage-v3.tpl.html',
      minYear: 1,
      maxYear: 30,
      stepYear: 0.5,
      minRate: 0.5,
      maxRate: 10,
      stepRate: 0.1,
      defaultRate: 4.0,
      defaultPrincipalAmount: 150000.0,
      currency: '$'
    };
    this.setTemplatePath = function (path) {
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

}());
