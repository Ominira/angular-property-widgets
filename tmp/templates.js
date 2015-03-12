angular.module('templates-main', ['../templates/dirMortgage-v2.tpl.html', '../templates/dirMortgage-v3.tpl.html', '../templates/dirMortgage.tpl.html', '../templates/dirRentals.tpl.html']);

angular.module("../templates/dirMortgage-v2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/dirMortgage-v2.tpl.html",
    "<div class=\"panel panel-primary\" style=\"background:none;border:none;\">\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"row\">\n" +
    "      <div role=\"form\" class=\"col-md-12\" style=\"color:#fff\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"principal\" class=\"control-label\">Mortgage Amount&nbsp;({{defaults.currency}})</label>\n" +
    "          <input type=\"number\" name=\"principal\" class=\"form-control\" data-ng-model=\"loan.principal\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"downPayment\" class=\"control-label\">Down Payment&nbsp;({{defaults.currency}})</label>\n" +
    "          <input type=\"number\" name=\"downPayment\" class=\"form-control\" data-ng-model=\"loan.downPayment\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"years\" class=\"control-label\">Mortgage term in years</label>\n" +
    "          <input type=\"number\" name=\"years\" class=\"form-control\" step=\"{{defaults.stepRate}}\" min=\"{{defaults.minYear}}\" max=\"{{defaults.maxYear}}\" data-ng-model=\"loan.years\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"months\" class=\"control-label\">Terms in months</label>\n" +
    "          <input type=\"number\" name=\"months\" class=\"form-control\" data-ng-model=\"loan.months\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"rate\" class=\"control-label\">Interest rate/year (%)</label>\n" +
    "          <input type=\"number\" class=\"form-control\" min=\"{{defaults.minRate}}\" max=\"{{defaults.maxRate}}\" step=\"{{defaults.stepRate}}\" data-ng-model=\"loan.rate\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"startDate\" class=\"control-label\">Mortgage Start Date</label>\n" +
    "          <input type=\"date\" name=\"startDate\" class=\"form-control\" data-ng-model=\"loan.startDate\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group text-center\">\n" +
    "          <button class=\"btn btn-primary text-uppercase active\" style=\"width:100%\" data-ng-click=\"calculate()\" ng-disabled=\"!loan.principal\">Calculate</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-12\">\n" +
    "        <div class=\"well text-center\">\n" +
    "          <h4 class=\"text-center\" data-ng-bind=\"(loan.monthlyPayments | currency:defaults.currency)\"></h4>\n" +
    "          <small class=\"text-center text-uppercase\">Monthly Payments</small>\n" +
    "        </div>\n" +
    "        <div class=\"well text-center\">\n" +
    "          <h4 class=\"text-center\" data-ng-bind=\"(loan.payOffDate | date:mediumDate)\"></h4>\n" +
    "          <small class=\"text-center text-uppercase\">Pay-off Date</small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/dirMortgage-v3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/dirMortgage-v3.tpl.html",
    "<div class=\"panel panel-primary\">\n" +
    "  <div class=\"panel-body\" style=\"background:rgba(0,0,0,0.5)\">\n" +
    "    <style type=\"text/css\">\n" +
    "      .dirMortgage-custom-styling .form-group{\n" +
    "        color: #fff;\n" +
    "      }\n" +
    "      .dirMortgage-custom-styling label {\n" +
    "        font-weight: normal;\n" +
    "        font-size: 15px;\n" +
    "      }\n" +
    "      .dirMortgage-custom-styling legend {\n" +
    "        color: #fff;\n" +
    "        font-size: 15px;\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "      .dirMortgage-custom-styling .custom-input {\n" +
    "        display: table-cell;\n" +
    "        vertical-align: middle;\n" +
    "        text-align: center;\n" +
    "        width: 45%;\n" +
    "      }\n" +
    "      .dirMortgage-custom-styling .custom-input.middle {\n" +
    "        width: 10%;\n" +
    "        padding: 0px 10px;\n" +
    "      }\n" +
    "      .dirMortgage-custom-styling .inactive-input {\n" +
    "        background: gainsboro;\n" +
    "      }\n" +
    "    </style>\n" +
    "    <div class=\"row  dirMortgage-custom-styling\">\n" +
    "      <div role=\"form\" class=\"col-md-12\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"principal\">Mortgage Amount&nbsp;({{defaults.currency}})</label>\n" +
    "          <input type=\"number\" name=\"principal\" class=\"form-control input-sm\" data-ng-model=\"loan.principal\"/>\n" +
    "        </div>\n" +
    "        <div class=\"form-group col-md-12\">\n" +
    "          <legend>Mortgage Term</legend>\n" +
    "          <div class=\"custom-input\">\n" +
    "            <em for=\"years\">In Years</em>\n" +
    "            <input type=\"number\" name=\"years\" class=\"form-control input-sm\" step=\"{{defaults.stepYear}}\" min=\"{{defaults.minYear}}\" max=\"{{defaults.maxYear}}\" data-ng-model=\"loan.years\" data-ng-focus=\"focusYear()\" data-ng-class=\"{'inactive-input': loan.months > 0}\"/>\n" +
    "          </div>\n" +
    "          <div class=\"custom-input middle\">or</div>\n" +
    "          <div class=\"custom-input\">\n" +
    "            <em for=\"months\">In Months</em>\n" +
    "            <input type=\"number\" name=\"months\" class=\"form-control input-sm\" data-ng-model=\"loan.months\" step=\"1\" data-ng-focus=\"focusMonth()\" data-ng-class=\"{'inactive-input': loan.years > 0}\"/>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"rate\">Interest Rate/Year (%)</label>\n" +
    "          <input type=\"number\" class=\"form-control input-sm\" min=\"{{defaults.minRate}}\" max=\"{{defaults.maxRate}}\" step=\"{{defaults.stepRate}}\" data-ng-model=\"loan.rate\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-12\">\n" +
    "        <div class=\"well text-center\">\n" +
    "          <h4 class=\"text-center\" data-ng-bind=\"(loan.monthlyPayments | currency:defaults.currency)\"></h4>\n" +
    "          <small class=\"text-center text-uppercase\">Monthly Payments</small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/dirMortgage.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/dirMortgage.tpl.html",
    "<div class=\"panel panel-primary\">\n" +
    "  <div class=\"panel-heading\" style=\"background-color:rgba(0,0,0,0.7);color:#fff;\">\n" +
    "    <h4>Mortgage Loan Calculator</h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\" style=\"background:rgba(0,0,0,0.5)\">\n" +
    "    <div role=\"form\" class=\"col-md-9\">\n" +
    "      <div class=\"input-group form-group\">\n" +
    "        <label for=\"downPayment\" id=\"label-addon1\" class=\"input-group-addon control-label\">Down Payment&nbsp;({{defaults.currency}})</label>\n" +
    "        <input type=\"number\" name=\"downPayment\" class=\"form-control\" aria-describedby=\"label-addon1\" data-ng-model=\"loan.downPayment\"/>\n" +
    "      </div>\n" +
    "      <div class=\"input-group form-group\">\n" +
    "        <label for=\"principal\" class=\"input-group-addon\" id=\"label-addon2\">Mortgage Amount&nbsp;({{defaults.currency}})</label>\n" +
    "        <input type=\"number\" name=\"principal\" class=\"form-control\" data-ng-model=\"loan.principal\" aria-describedby=\"label-addon2\"/>\n" +
    "      </div>\n" +
    "      <div class=\"input-group form-group\">\n" +
    "        <label for=\"years\" class=\"input-group-addon\" id=\"label-addon3\">Mortgage term in years</label>\n" +
    "        <input type=\"number\" name=\"years\" class=\"form-control\" aria-describedby=\"label-addon3\" step=\"{{defaults.stepRate}}\" min=\"{{defaults.minYear}}\" max=\"{{defaults.maxYear}}\" data-ng-model=\"loan.years\"/>\n" +
    "      </div>\n" +
    "      <div class=\"input-group form-group\">\n" +
    "        <label for=\"months\" class=\"input-group-addon\" id=\"label-addon4\">Terms in months</label>\n" +
    "        <input type=\"number\" name=\"months\" class=\"form-control\" data-ng-model=\"loan.months\" aria-describedby=\"label-addon4\"/>\n" +
    "      </div>\n" +
    "      <div class=\"input-group form-group\">\n" +
    "      <label for=\"rate\" class=\"input-group-addon\" id=\"label-addon5\">Interest rate/year (%)</label>\n" +
    "        <input type=\"number\" class=\"form-control\" min=\"{{defaults.minRate}}\" aria-describedby=\"label-addon5\" max=\"{{defaults.maxRate}}\" step=\"{{defaults.stepRate}}\" data-ng-model=\"loan.rate\"/>\n" +
    "      </div>\n" +
    "      <div class=\"input-group form-group\">\n" +
    "        <label for=\"startDate\" class=\"input-group-addon\" id=\"label-addon6\">Mortgage Start Date</label>\n" +
    "        <input type=\"date\" name=\"startDate\" class=\"form-control\" data-ng-model=\"loan.startDate\" aria-describedby=\"label-addon6\"/>\n" +
    "      </div>\n" +
    "      <div class=\"form-group text-center\">\n" +
    "        <button class=\"btn btn-lg btn-primary active text-upper col-md-12\" data-ng-click=\"calculate()\" ng-disabled=\"!loan.principal\">Calculate</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <div class=\"well text-center\">\n" +
    "        <h4 class=\"text-center\" data-ng-bind=\"(loan.monthlyPayments | currency:defaults.currency)\"></h4>\n" +
    "        <small class=\"text-center text-uppercase\">Monthly Payments</small>\n" +
    "      </div>\n" +
    "      <div class=\"well text-center\">\n" +
    "        <h4 class=\"text-center\" data-ng-bind=\"(loan.payOffDate | date:mediumDate)\"></h4>\n" +
    "        <small class=\"text-center text-uppercase\">Pay-off Date</small>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/dirRentals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/dirRentals.tpl.html",
    "<div class=\"panel panel-info\">\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"input-group form-group\">\n" +
    "      <label for=\"Rent\" id=\"label-addon1\" class=\"input-group-addon control-label\">Rent</label>\n" +
    "      <input type=\"number\" name=\"Rent\" class=\"form-control\" aria-describedby=\"label-addon1\" data-ng-model=\"rentals.deposit\"/>\n" +
    "    </div>\n" +
    "    <div class=\"input-group form-group\">\n" +
    "      <label for=\"RoomWidth\" id=\"label-addon1\" class=\"input-group-addon control-label\">Room Width</label>\n" +
    "      <input type=\"number\" name=\"RoomWidth\" class=\"form-control\" aria-describedby=\"label-addon1\" data-ng-model=\"rentals.roomWidth\"/>\n" +
    "    </div>\n" +
    "    <div class=\"input-group form-group\">\n" +
    "      <label for=\"RoomWidth\" id=\"label-addon1\" class=\"input-group-addon control-label\">Room Depth</label>\n" +
    "      <input type=\"number\" name=\"RoomWidth\" class=\"form-control\" aria-describedby=\"label-addon1\" data-ng-model=\"rentals.roomDepth\"/>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button data-ng-click=\"calculate()\" class=\"btn btn-primary\">Compute</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <div class=\"well text-center\">\n" +
    "        <h4 class=\"text-center\" data-ng-bind=\"(rentals.totalRentAmount | currency)\"></h4>\n" +
    "        <small class=\"text-center text-uppercase\">Rental</small>\n" +
    "      </div>\n" +
    "      <div class=\"well text-center\">\n" +
    "        <h4 class=\"text-center\" data-ng-bind=\"(rentals.totalRoomSize)\"></h4>\n" +
    "        <small class=\"text-center text-uppercase\">Room Size (Square {{rentals.unitOfMeasure}})</small>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <div ng-if=\"rentals.otherUnitSizes\" class=\"well table-responsive\">\n" +
    "        <table class=\"table table-striped\">\n" +
    "          <tr ng-repeat=\"(key, value) in rentals.otherUnitSizes\">\n" +
    "            <th ng-bind=\"key\"></th>\n" +
    "            <td ng-bind=\"value\"></td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);
