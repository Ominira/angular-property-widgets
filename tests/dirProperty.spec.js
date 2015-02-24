'use strict';

describe('Provider: dirRentalService', function () {
  // body...
  var dirRentalServiceProvider;
  beforeEach(module('dirProperty', function (_dirRentalServiceProvider_) {
    dirRentalServiceProvider = _dirRentalServiceProvider_;
  }));
  it('should be defined', inject(function () {
    expect(dirRentalServiceProvider).toBeDefined();
  }));
  it('should have set template defined', inject(function () {
    expect(dirRentalServiceProvider.setTemplatePath).toBeDefined();
  }));
  it('should set template path and return correct template path', inject(function () {
    dirRentalServiceProvider.setTemplatePath('abc');
    expect(dirRentalServiceProvider.$get().getTemplatePath()).toEqual('abc');
  }));
  it('should have set metric unit options defined', inject(function () {
    expect(dirRentalServiceProvider.setUnitOfMeasures).toBeDefined();
  }));
  it('should predefine metric units, and return correctly defined units', inject(function () {
    var metricUnits = "litre, miles, km, ft";
    dirRentalServiceProvider.setUnitOfMeasures(metricUnits);
    var expectedReponse = ['litre','miles','km','ft'];
    expect(dirRentalServiceProvider.$get().getUnitOfMeasures()).toEqual(expectedReponse);
  }));
});

describe('Provider: dirMortgageService', function () {
  var dirMortgageServiceProvider;
  beforeEach(module('dirProperty', function (_dirMortgageServiceProvider_) {
    dirMortgageServiceProvider = _dirMortgageServiceProvider_;
  }));
  it('should be definded', inject(function () {
    expect(dirMortgageServiceProvider).toBeDefined();
  }));
  it('should have set template path defined', inject(function () {
    expect(dirMortgageServiceProvider.setTemplatePath).toBeDefined();
  }));
  it('should set template path and return correct template path', inject(function () {
    dirMortgageServiceProvider.setTemplatePath('xyz');
    expect(dirMortgageServiceProvider.$get().getTemplatePath()).toEqual('xyz');
  }));
  it('should set currency and return set currency type', inject(function () {
    dirMortgageServiceProvider.setCurrency('MYR');
    expect(dirMortgageServiceProvider.$get().getCurrency()).toEqual('MYR');
  }));
});

describe('Service: computeEngine', function () {
  // body...
  var computeEngine;
  beforeEach(module('dirProperty'));
  beforeEach(inject(function (_computeEngine_) {
    computeEngine = _computeEngine_;
  }));
  it('should be defined', function () {
    expect(computeEngine).toBeDefined();
  });
  it('should have override for Date defined', function () {
    expect(computeEngine.overrideDate).toBeDefined();
  });
  it('should have morgage calculate defined', function () {
    expect(computeEngine.calculateMortgage).toBeDefined();
  });
  it('should have rent calculator defined', function () {
    expect(computeEngine.calculateRent).toBeDefined();
  });
  it('should have metric units values getter defined', function () {
    expect(computeEngine.getUnitsMeasurements).toBeDefined();
  });
  it('should have unit calculator function defined', function () {
    expect(computeEngine.calculateUnits).toBeDefined();
  });
});
