"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var RawQuery_1 = require("../common/RawQuery");
var OverDueDAO_1 = require("../repos/OverDueDAO");
var CustTransMasterDAO_1 = require("../repos/CustTransMasterDAO");
var OverDueService = /** @class */ (function () {
    function OverDueService() {
        this.db = typeorm_1.getManager();
        this.overDueDAO = new OverDueDAO_1.OverDueDAO();
        this.custTransDAO = new CustTransMasterDAO_1.CustTransMasterDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
    }
    OverDueService.prototype.entity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.overDueDAO.entity(id)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OverDueService.prototype.search = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.overDueDAO.search(reqData)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OverDueService.prototype.getCreditUsed = function (accountNum) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.custTransDAO.overdueData(accountNum)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // async getCreditUsed(accountNum: string) {
    //   let result: any = {};
    //   let custDetails = await this.rawQuery.getCustomerCreditMax(accountNum);
    //   result.creditLimit = parseFloat(custDetails.creditmax);
    //   let custTransData: any[] = await this.custTransDAO.getCreditUsed(accountNum);
    //   result.usedCredit = custTransData.reduce((res: number, item: any) => res + parseInt(item.invoiceamount), 0);
    //   console.log(custTransData, result.usedCredit);
    //   let salesIds = custTransData.map((item: any) => {
    //     return item.invoiceid;
    //   });
    //   let data: any = await this.overDueDAO.getCreditUsed(accountNum, salesIds);
    //   console.log("data-====================>", data);
    //   let overDue = await this.overDueDAO.getOverDueCredit(accountNum);
    //   console.log("overdue-====================>", overDue);
    //   data.map((item: any) => {
    //     item.invoiceAmount = parseFloat(item.invoiceAmount);
    //     item.actualDueDate = new Date(item.actualDueDate).toISOString().substr(0, 10);
    //     item.duedate = new Date(item.duedate).toISOString().substr(0, 10);
    //     item.createddatetime = new Date(item.createddatetime).toISOString().substr(0, 10);
    //     item.lastModifiedDate = new Date(item.lastModifiedDate).toISOString().substr(0, 10);
    //     item.invoicedate = new Date(item.invoicedate).toISOString().substr(0, 10);
    //     result.usedCredit += item.invoiceAmount;
    //   });
    //   result.availableCredit = result.creditLimit > 0 ? result.creditLimit - result.usedCredit : 0;
    //   result.invoices = custTransData.concat(overDue);
    //   console.log(result);
    //   return result;
    // }
    OverDueService.prototype.getCreditBalancesUsedCalculation = function (accountNum) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        result = {};
                        return [4 /*yield*/, this.overDueDAO.getCreditBalancesUsed(accountNum)];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        if (data && data.length > 0) {
                            data = data[0];
                            result.accountnum = data.accountnum;
                            result.creditLimit = data.creditmax;
                            console.log(data.amountcusttrans);
                            console.log(data.overdueamount);
                            data.amountcusttrans = parseFloat(data.amountcusttrans);
                            data.overdueamount = parseFloat(data.overdueamount);
                            result.usedCredit = data.amountcusttrans + data.overdueamount;
                            result.availableCredit = result.creditLimit > 0 ? result.creditLimit - result.usedCredit : 0;
                        }
                        console.table(result);
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OverDueService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.overDueDAO.createOverDue(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OverDueService;
}());
exports.OverDueService = OverDueService;
