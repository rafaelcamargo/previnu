angular.module('templates', ['components/icon/icon-template.html', 'components/logo/logo-template.html', 'components/retirement-simulation-form/retirement-simulation-form-template.html', 'components/retirement-simulation-panel/retirement-simulation-panel-template.html', 'components/symbol-value/symbol-value-template.html', 'components/topbar/topbar-template.html', 'components/viewport/viewport-template.html', 'views/home/home-template.html', 'views/simulation/simulation-template.html']);

angular.module("components/icon/icon-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/icon/icon-template.html",
    "<i class=\"icon {{$ctrl.icon}}\"></i>\n" +
    "");
}]);

angular.module("components/logo/logo-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/logo/logo-template.html",
    "<div class=\"logo-container\">\n" +
    "  <div class=\"logo\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/retirement-simulation-form/retirement-simulation-form-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/retirement-simulation-form/retirement-simulation-form-template.html",
    "<form class=\"retirement-simulation-form\" ng-submit=\"$ctrl.simulate()\">\n" +
    "  <div class=\"retirement-simulation-form-item\" ng-repeat=\"setting in $ctrl.settings\">\n" +
    "    <div class=\"retirement-simulation-form-item-label\" ng-bind=\"setting.title\"></div>\n" +
    "    <div class=\"range\">\n" +
    "      <input\n" +
    "        type=\"range\"\n" +
    "        name=\"{{ setting.type }}\"\n" +
    "        ng-model=\"setting.amount.current\"\n" +
    "        min=\"{{ setting.amount.min }}\"\n" +
    "        max=\"{{ setting.amount.max }}\"\n" +
    "        step=\"{{ setting.amount.step }}\" />\n" +
    "    </div>\n" +
    "    <symbol-value data-symbol=\"{{ setting.amount.symbol }}\">\n" +
    "      {{ setting.amount.current | commaDecimal: setting.amount.precision }}\n" +
    "    </symbol-value>\n" +
    "  </div>\n" +
    "  <button type=\"submit\" class=\"button button-primary\">\n" +
    "    Simular\n" +
    "  </button>\n" +
    "</form>\n" +
    "");
}]);

angular.module("components/retirement-simulation-panel/retirement-simulation-panel-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/retirement-simulation-panel/retirement-simulation-panel-template.html",
    "<div class=\"retirement-simulation-panel\">\n" +
    "  <div class=\"retirement-simulation-panel-content {{ $ctrl.simulationPanelContentCssClass }}\">\n" +
    "    <div class=\"retirement-simulation-panel-monthly-benefit-container\" data-js=\"monthly-benefit-container\">\n" +
    "      <p>\n" +
    "        Benefício Mensal Previsto*\n" +
    "      </p>\n" +
    "      <p class=\"retirement-simulation-panel-monthly-benefit-amount\">\n" +
    "        <symbol-value data-symbol=\"currency\">\n" +
    "          {{ 1500 | brlCurrency }}\n" +
    "        </symbol-value>\n" +
    "      </p>\n" +
    "      <p class=\"retirement-simulation-panel-monthly-benefit-caption\">\n" +
    "        Conversão de 19583.53 para os valores atuais considerando a inflação informada.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"retirement-simulation-panel-list-container\" data-js=\"simulation-list-container\">\n" +
    "      <div class=\"retirement-simulation-panel-list-header\" data-js=\"simulation-list-header\">\n" +
    "        <div class=\"retirement-simulation-panel-item\">\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-date\">\n" +
    "            Mês\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-deposit\">\n" +
    "            Depósito\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-profit\">\n" +
    "            Rendimento\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-balance\">\n" +
    "            Saldo\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"retirement-simulation-panel-list\" ng-style=\"$ctrl.simulationListHeight\">\n" +
    "        <div class=\"retirement-simulation-panel-item\" ng-repeat=\"month in $ctrl.simulation\">\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-date\"\n" +
    "            ng-bind=\"month.date | date : 'MM/yy'\">\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-deposit\"\n" +
    "            ng-bind=\"month.monthlyContribution | brlCurrency\">\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-profit\"\n" +
    "            ng-bind=\"month.monthlyProfit | brlCurrency\">\n" +
    "          </div>\n" +
    "          <div class=\"retirement-simulation-panel-item-detail retirement-simulation-panel-item-detail-balance\"\n" +
    "            ng-bind=\"month.balance | brlCurrency\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/symbol-value/symbol-value-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/symbol-value/symbol-value-template.html",
    "<div class=\"symbol-value symbol-value-{{ $ctrl.symbol }}\">\n" +
    "  <ng-transclude></ng-transclude>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/topbar/topbar-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/topbar/topbar-template.html",
    "<div class=\"topbar-container\">\n" +
    "  <div class=\"topbar-content\" ng-if=\"$ctrl.title\">\n" +
    "    <div class=\"topbar-back-trigger\" ng-click=\"$ctrl.back()\">\n" +
    "      <icon data-icon=\"ion-ios-arrow-back\"></icon>\n" +
    "      <icon data-icon=\"ion-android-arrow-back\"></icon>\n" +
    "    </div>\n" +
    "    <h1 ng-bind=\"$ctrl.title\"></h1>\n" +
    "  </div>\n" +
    "  <div class=\"topbar-content\" ng-if=\"!$ctrl.title\">\n" +
    "    <ng-transclude></ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/viewport/viewport-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/viewport/viewport-template.html",
    "<div class=\"viewport\" ng-style=\"$ctrl.style\">\n" +
    "  <ng-transclude></ng-transclude>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/home/home-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home/home-template.html",
    "<topbar>\n" +
    "  <logo></logo>\n" +
    "</topbar>\n" +
    "<viewport>\n" +
    "  <retirement-simulation-form></retirement-simulation-form>\n" +
    "</viewport>\n" +
    "");
}]);

angular.module("views/simulation/simulation-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/simulation/simulation-template.html",
    "<topbar data-title=\"Simulação\">\n" +
    "</topbar>\n" +
    "<viewport>\n" +
    "  <retirement-simulation-panel></retirement-simulation-panel>\n" +
    "</viewport>\n" +
    "");
}]);
