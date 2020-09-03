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
var SalesTableDAO_1 = require("../repos/SalesTableDAO");
var RawQuery_1 = require("../common/RawQuery");
var typeorm_1 = require("typeorm");
var ReturnOrderAmountService = /** @class */ (function () {
    function ReturnOrderAmountService() {
        this.salesTableDAO = new SalesTableDAO_1.SalesTableDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.db = typeorm_1.getManager();
    }
    ReturnOrderAmountService.prototype.returnAmount = function (reqData, type) {
        return __awaiter(this, void 0, void 0, function () {
            var salesOrderData, prevReturnOrderAmounts, customer, condition, salesLine, salesLineIds, grossAmount, total, discount, vat, sendForApproval, totalGrossAmountAfterReturnItems, filteredSalesLine, promotionalDiscountItems, promotionalreturnItems, discountConditions, _i, salesLine_1, item, checkForPromotional, _loop_1, _a, _b, item, result, _loop_2, _c, result_1, item, returnOrderData, selectedBatchesGroup, selectedBatches, lineNum, _loop_3, this_1, _d, selectedBatches_1, item, cashAmount, redeemAmount, designServiceRedeemAmount;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.salesTableDAO.entity(reqData.salesid.toUpperCase())];
                    case 1:
                        salesOrderData = _e.sent();
                        console.log(salesOrderData.cashAmount);
                        return [4 /*yield*/, this.rawQuery.getPrevReturnOrderAmount(reqData.salesid.toUpperCase())];
                    case 2:
                        prevReturnOrderAmounts = _e.sent();
                        this.rawQuery.sessionInfo = this.sessionInfo;
                        return [4 /*yield*/, this.rawQuery.getCustomer(salesOrderData.custAccount)];
                    case 3:
                        customer = _e.sent();
                        return [4 /*yield*/, this.rawQuery.workflowconditions(this.sessionInfo.usergroupconfigid)];
                    case 4:
                        condition = _e.sent();
                        salesLine = salesOrderData.salesLine;
                        salesLineIds = [];
                        grossAmount = 0;
                        total = 0;
                        discount = 0;
                        vat = 0;
                        sendForApproval = customer.custtype == 1 || customer.custtype == 2 ? true : false;
                        reqData.selectedBatches.map(function (v) {
                            salesLineIds.push(v.salesLineId);
                        });
                        totalGrossAmountAfterReturnItems = parseFloat(salesOrderData.amount);
                        filteredSalesLine = salesLine.filter(function (v) { return salesLineIds.includes(v.id); });
                        filteredSalesLine.map(function (v) {
                            var filteredBatch = reqData.selectedBatches.filter(function (i) { return i.salesLineId == v.id; });
                            var returnQuantity = filteredBatch.reduce(function (res, item) { return res + parseInt(item.returnQuantity); }, 0);
                            totalGrossAmountAfterReturnItems -= parseFloat(v.salesprice) * returnQuantity - v.totalSettledAmount;
                        });
                        promotionalDiscountItems = [];
                        promotionalreturnItems = [];
                        discountConditions = {};
                        for (_i = 0, salesLine_1 = salesLine; _i < salesLine_1.length; _i++) {
                            item = salesLine_1[_i];
                            item.appliedDiscounts = item.appliedDiscounts ? item.appliedDiscounts : [];
                            checkForPromotional = item.appliedDiscounts.filter(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; });
                            if (checkForPromotional.length > 0) {
                                promotionalDiscountItems.push(item);
                            }
                        }
                        _loop_1 = function (item) {
                            var line = salesLine.filter(function (v) { return v.id == item.salesLineId; })[0];
                            line.returnQuantity = item.returnQuantity;
                            var promotionalItems = promotionalDiscountItems.filter(function (v) { return v.linkId == line.linkId; });
                            if (promotionalItems.length > 0) {
                                promotionalreturnItems.push(line);
                            }
                        };
                        for (_a = 0, _b = reqData.selectedBatches; _a < _b.length; _a++) {
                            item = _b[_a];
                            _loop_1(item);
                        }
                        result = this.groupBy(promotionalreturnItems, function (item) {
                            return [item.linkId];
                        });
                        _loop_2 = function (item) {
                            var linkId = item[0].linkId;
                            var totalQuantity = 0;
                            var totalReturningQty = 0;
                            var totalSettledAmount = 0;
                            var totalReturnedQuantity = 0;
                            var remainSalesFinancial = 0;
                            var Promotionallines = salesLine.filter(function (v) { return item[0].linkId == v.linkId; });
                            var gotFreeQty = 0;
                            var promotionalFreeItems = salesLine.filter(function (v) { return item[0].linkId == v.linkId && v.isItemFree == true; });
                            promotionalFreeItems.map(function (v) {
                                gotFreeQty += parseInt(v.salesQty);
                            });
                            Promotionallines.map(function (v) {
                                totalQuantity += parseInt(v.salesQty) - parseInt(v.totalReturnedQuantity);
                                totalSettledAmount += parseFloat(v.totalSettledAmount);
                                totalReturnedQuantity += parseFloat(v.totalReturnedQuantity);
                                remainSalesFinancial += v.remainSalesFinancial ? parseInt(v.remainSalesFinancial) : 0;
                            });
                            item.map(function (v) {
                                totalReturningQty += v.returnQuantity;
                            });
                            var totalQuantityAfterReturn = totalQuantity - totalReturningQty;
                            console.log(totalQuantity, totalReturningQty, totalQuantityAfterReturn);
                            var line = salesLine.filter(function (v) { return v.id == item[0].id; })[0];
                            var promotionalParentItem = promotionalDiscountItems.filter(function (v) { return v.linkId == line.linkId; })[0];
                            var promotionalDiscountCondition = promotionalParentItem.appliedDiscounts.filter(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; })[0];
                            var promotionalDiscountAmount = promotionalDiscountCondition.discountAmount;
                            var multipleQty = promotionalDiscountCondition.cond[0].multipleQty;
                            var freeQty = promotionalDiscountCondition.cond[0].freeQty;
                            var eligitbleFreeQuantity = Math.floor((totalQuantityAfterReturn - gotFreeQty) / multipleQty) * freeQty;
                            eligitbleFreeQuantity = eligitbleFreeQuantity >= 0 ? eligitbleFreeQuantity : 0;
                            var discountOnEachItem = promotionalDiscountAmount / gotFreeQty;
                            var qtyForDeducting = gotFreeQty - eligitbleFreeQuantity - remainSalesFinancial;
                            var promotionalDiscount = promotionalDiscountAmount -
                                discountOnEachItem * eligitbleFreeQuantity -
                                discountOnEachItem * remainSalesFinancial;
                            promotionalDiscount = promotionalDiscount >= 0 ? promotionalDiscount : 0;
                            console.log(linkId);
                            discountConditions[linkId] = {
                                linkId: item[0].linkId,
                                discountAmount: promotionalDiscountAmount,
                                totalSettledAmount: totalSettledAmount,
                                multipleQty: multipleQty,
                                freeQty: freeQty,
                                gotFreeQty: gotFreeQty,
                                eligibleFreeQty: eligitbleFreeQuantity,
                                deductableFreeAmount: promotionalDiscount,
                                isAmountDeducated: false,
                                totalQuantityAfterReturn: totalQuantityAfterReturn,
                                qtyForDeducting: qtyForDeducting,
                                discountType: "PROMOTIONAL_DISCOUNT",
                            };
                        };
                        // console.log(result)
                        for (_c = 0, result_1 = result; _c < result_1.length; _c++) {
                            item = result_1[_c];
                            _loop_2(item);
                        }
                        return [4 /*yield*/, this.allocateReturnOrderData(salesOrderData, type)];
                    case 5:
                        returnOrderData = _e.sent();
                        returnOrderData.salesLine = [];
                        reqData.selectedBatches = reqData.selectedBatches.filter(function (v) { return v.returnQuantity > 0; });
                        selectedBatchesGroup = this.groupBy(reqData.selectedBatches, function (item) {
                            return [item.itemid, item.configid, item.inventsizeid, item.isItemFree, item.salesLineId];
                        });
                        selectedBatches = [];
                        selectedBatchesGroup.forEach(function (groupitem) {
                            var qty = groupitem.reduce(function (res, item) { return res + parseInt(item.returnQuantity); }, 0);
                            var batch = [];
                            groupitem.forEach(function (element) {
                                batch.push({
                                    batchno: element.batchno,
                                    returnQuantity: element.returnQuantity,
                                });
                            });
                            groupitem[0].returnQuantity = qty;
                            groupitem[0].batches = batch;
                            selectedBatches.push(groupitem[0]);
                        });
                        lineNum = 1;
                        _loop_3 = function (item) {
                            var line = salesLine.filter(function (v) { return v.id == item.salesLineId; })[0];
                            line.colorantprice = line.colorantprice ? line.colorantprice : 0;
                            var itemGrossAmount = (parseFloat(line.salesprice) + parseFloat(line.colorantprice)) * parseInt(item.returnQuantity);
                            var itemTotal = (parseFloat(line.salesprice) + parseFloat(line.colorantprice)) * parseInt(item.returnQuantity);
                            var itemDiscount = 0;
                            var itemVat = 0;
                            grossAmount += itemGrossAmount;
                            var returnItem = {};
                            this_1.allocateReturnItem(returnItem, line);
                            returnItem.appliedDiscounts = [];
                            if (line.appliedDiscounts.length > 0) {
                                var _loop_4 = function (discountItem) {
                                    if (discountItem.discountType == "TOTAL_DISCOUNT") {
                                        var returnDiscount = (parseFloat(line.salesprice) + parseFloat(line.colorantprice)) *
                                            (parseFloat(discountItem.percentage) / 100) *
                                            parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.cond,
                                        });
                                    }
                                    if (discountItem.discountType == "LINE_DISCOUNT") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.cond,
                                        });
                                    }
                                    if (discountItem.discountType == "INTERIOR_AND_EXTERIOR") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "SABIC_CUSTOMER_DISCOUNT") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "VOUCHER_DISCOUNT") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "SALES_DISCOUNT") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "INSTANT_DISCOUNT") {
                                        var percentage = 0;
                                        for (var _i = 0, _a = discountItem.cond; _i < _a.length; _i++) {
                                            var range = _a[_i];
                                            if (totalGrossAmountAfterReturnItems >= parseFloat(range.minamount) &&
                                                totalGrossAmountAfterReturnItems <= parseFloat(range.maxamount)) {
                                                percentage = parseInt(range.discpercent);
                                                break;
                                            }
                                        }
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "MULTI_LINE_DISCOUNT") {
                                        var returnDiscount = parseFloat(line.salesprice) * (parseFloat(discountItem.percentage) / 100) * parseInt(item.returnQuantity);
                                        itemDiscount += returnDiscount;
                                        itemTotal -= returnDiscount;
                                        returnItem.appliedDiscounts.push({
                                            discountType: discountItem.discountType,
                                            percentage: discountItem.percentage,
                                            discountAmount: returnDiscount,
                                            cond: discountItem.code,
                                        });
                                    }
                                    if (discountItem.discountType == "BUY_ONE_GET_ONE_DISCOUNT") {
                                        // console.log("========================================", line.isItemFree);
                                        var returnParentQty_1 = 0;
                                        var returnFreeQty_1 = 0;
                                        var packageItems = reqData.selectedBatches.filter(function (v) { return v.linkId == item.linkId; });
                                        var returningFreeItems = packageItems.filter(function (v) { return v.isItemFree == true; });
                                        var returningParentItems = packageItems.filter(function (v) { return v.isItemFree == false; });
                                        returningFreeItems.map(function (v) {
                                            returnFreeQty_1 += parseInt(v.returnQuantity);
                                        });
                                        returningParentItems.map(function (v) {
                                            returnParentQty_1 += parseInt(v.returnQuantity);
                                        });
                                        if (returnParentQty_1 == returnFreeQty_1) {
                                            var returnDiscount = 0;
                                            var itemDiscountAmount_1 = 0;
                                            if (line.isItemFree) {
                                                itemDiscountAmount_1 = parseFloat(discountItem.discountAmount);
                                                returnDiscount = (itemDiscountAmount_1 / parseFloat(line.salesQty)) * parseInt(item.returnQuantity);
                                                // console.log(returnDiscount);
                                            }
                                            else {
                                                var returningFreeLines_1 = salesLine.filter(function (v) { return v.linkId == item.linkId && v.isItemFree == true; });
                                                var filteredReturningFreeLines_1 = [];
                                                returningFreeItems.map(function (a) {
                                                    var returningFreeLine = returningFreeLines_1.filter(function (b) { return b.id == a.salesLineId; })[0];
                                                    returningFreeLine.returnQuantity = a.returnQuantity;
                                                    filteredReturningFreeLines_1.push(returningFreeLine);
                                                });
                                                filteredReturningFreeLines_1.map(function (x) {
                                                    var d = x.appliedDiscounts.find(function (y) { return y.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                                    var t = x.appliedDiscounts.find(function (y) { return y.discountType == "TOTAL_DISCOUNT"; });
                                                    itemDiscountAmount_1 += (parseFloat(d.discountAmount) / parseFloat(x.salesQty)) * x.returnQuantity;
                                                    if (t && t.discountAmount) {
                                                        itemDiscountAmount_1 -= (parseFloat(t.discountAmount) / parseFloat(x.salesQty)) * x.returnQuantity;
                                                    }
                                                });
                                                returnDiscount = itemDiscountAmount_1;
                                                // console.log(returnDiscount);
                                            }
                                            itemDiscount += returnDiscount;
                                            itemTotal -= returnDiscount;
                                            returnItem.appliedDiscounts.push({
                                                discountType: discountItem.discountType,
                                                percentage: discountItem.percentage,
                                                discountAmount: returnDiscount,
                                                cond: discountItem.code,
                                            });
                                        }
                                        else {
                                            throw { message: "PLEASE_ADD_FREE_ITEMS" };
                                        }
                                    }
                                };
                                for (var _i = 0, _a = line.appliedDiscounts; _i < _a.length; _i++) {
                                    var discountItem = _a[_i];
                                    _loop_4(discountItem);
                                }
                            }
                            else {
                                itemDiscount += 0;
                                itemTotal -= 0;
                            }
                            if (discountConditions[line.linkId]) {
                                var discObj = discountConditions[line.linkId];
                                // console.log(discObj);
                                returnItem.appliedDiscounts.push({
                                    discountType: "PROMOTIONAL_DISCOUNT",
                                    discountAmount: discObj.deductableFreeAmount,
                                });
                                if (!discObj.isAmountDeducated) {
                                    itemDiscount += discObj.deductableFreeAmount;
                                    itemTotal -= discObj.deductableFreeAmount;
                                    discountConditions[line.linkId].deductableFreeAmount -= discObj.deductableFreeAmount;
                                    returnItem.remainSalesFinancial = discObj.qtyForDeducting;
                                    discountConditions[line.linkId].isAmountDeducated = true;
                                    // console.log(total);
                                }
                                else {
                                    itemDiscount += 0;
                                    total -= 0;
                                }
                            }
                            itemVat = (parseFloat(line.vatamount) / parseInt(line.salesQty)) * parseInt(item.returnQuantity);
                            itemTotal += itemVat;
                            vat += itemVat;
                            discount += itemDiscount;
                            total += itemTotal;
                            returnItem.salesQty = item.returnQuantity;
                            returnItem.qtyOrdered = item.returnQuantity;
                            returnItem.lineTotalDisc = itemDiscount;
                            returnItem.lineAmount = itemGrossAmount - line.colorantprice * item.returnQuantity;
                            returnItem.vatamount = itemVat;
                            returnItem.isItemFree = item.isItemFree;
                            returnItem.linkId = item.linkId;
                            returnItem.lineNum = lineNum;
                            returnItem.batches = item.batches;
                            returnOrderData.salesLine.push(returnItem);
                            lineNum += 1;
                        };
                        this_1 = this;
                        for (_d = 0, selectedBatches_1 = selectedBatches; _d < selectedBatches_1.length; _d++) {
                            item = selectedBatches_1[_d];
                            _loop_3(item);
                        }
                        cashAmount = 0;
                        redeemAmount = 0;
                        designServiceRedeemAmount = 0;
                        if (prevReturnOrderAmounts) {
                            cashAmount =
                                parseFloat(salesOrderData.cashAmount) +
                                    parseFloat(salesOrderData.cardAmount) -
                                    parseFloat(prevReturnOrderAmounts.cashAmount);
                            redeemAmount = parseFloat(salesOrderData.redeemAmount) - parseFloat(prevReturnOrderAmounts.redeemAmount);
                            designServiceRedeemAmount =
                                parseFloat(salesOrderData.designServiceRedeemAmount) -
                                    parseFloat(prevReturnOrderAmounts.designServiceRedeemAmount);
                        }
                        else {
                            cashAmount = parseFloat(salesOrderData.cashAmount) + parseFloat(salesOrderData.cardAmount);
                            redeemAmount = parseFloat(salesOrderData.redeemAmount);
                            designServiceRedeemAmount = parseFloat(salesOrderData.designServiceRedeemAmount);
                        }
                        if (cashAmount >= total) {
                            returnOrderData.cashAmount = total;
                            returnOrderData.redeemAmount = 0;
                            returnOrderData.designServiceRedeemAmount = 0;
                        }
                        else if (cashAmount < total) {
                            returnOrderData.cashAmount = cashAmount;
                            if (designServiceRedeemAmount >= total - cashAmount) {
                                returnOrderData.designServiceRedeemAmount = total - cashAmount;
                                returnOrderData.redeemAmount = 0;
                            }
                            else if (designServiceRedeemAmount < total - cashAmount) {
                                returnOrderData.designServiceRedeemAmount = designServiceRedeemAmount;
                                if (redeemAmount > 0) {
                                    returnOrderData.redeemAmount = total - cashAmount - designServiceRedeemAmount;
                                }
                                else {
                                    returnOrderData.redeemAmount = 0;
                                }
                            }
                        }
                        // console.log(cashAmount);
                        returnOrderData.amount = grossAmount;
                        returnOrderData.netAmount = total;
                        returnOrderData.disc = discount;
                        returnOrderData.vatamount = vat;
                        returnOrderData.sumTax = vat;
                        if (returnOrderData.designServiceRedeemAmount > 0) {
                            sendForApproval = true;
                        }
                        else if ((condition.rmApprovalRequired || condition.raApprovalRequired) && sendForApproval) {
                            sendForApproval = true;
                        }
                        else {
                            sendForApproval = false;
                        }
                        // console.log(sendForApproval, condition);
                        return [2 /*return*/, {
                                total: total > 0 ? total : 0,
                                grossTotal: grossAmount,
                                discount: discount,
                                vatPrice: vat,
                                cashAmount: returnOrderData.cashAmount,
                                redeemAmount: returnOrderData.redeemAmount,
                                designServiceRedeemAmount: returnOrderData.designServiceRedeemAmount,
                                sendForApproval: sendForApproval,
                                returnOrderData: returnOrderData,
                            }];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.groupBy = function (array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };
    ReturnOrderAmountService.prototype.allocateReturnOrderData = function (salesOrderData, type) {
        return {
            salesName: salesOrderData.salesName,
            custAccount: salesOrderData.custAccount,
            invoiceAccount: salesOrderData.invoiceAccount,
            currencyCode: salesOrderData.currencyCode,
            dataareaid: salesOrderData.dataareaid,
            custGroup: salesOrderData.custGroup,
            priceGroupId: salesOrderData.priceGroupId,
            numberSequenceGroup: salesOrderData.numberSequenceGroup,
            interCompanyOriginalSalesId: salesOrderData.salesId,
            salesGroup: salesOrderData.salesGroup,
            cityCode: salesOrderData.cityCode,
            districtCode: salesOrderData.districtCode,
            latitude: salesOrderData.latitude,
            longitude: salesOrderData.longitude,
            painter: salesOrderData.painter,
            taxGroup: salesOrderData.taxGroup,
            mobileNo: salesOrderData.mobileNo,
            isCash: salesOrderData.isCash,
            payment: salesOrderData.payment,
            sumTax: salesOrderData.sumTax,
            inventLocationId: salesOrderData.inventLocationId,
            region: salesOrderData.region,
            dimension: salesOrderData.dimension,
            dimension2_: salesOrderData.dimension2_,
            dimension3_: salesOrderData.dimension3_,
            dimension4_: salesOrderData.dimension4_,
            dimension5_: salesOrderData.dimension5_,
            salesmanId: salesOrderData.salesmanId,
            dimension7_: salesOrderData.dimension7_,
            dimension8_: salesOrderData.dimension8_,
            transkind: type == "purchasereturn" ? "PURCHASERETURN" : "RETURNORDER",
            status: "CREATED",
            warehouse: salesOrderData.warehouse,
        };
    };
    ReturnOrderAmountService.prototype.allocateReturnItem = function (returnItem, item) {
        returnItem.itemid = item.itemid;
        returnItem.salesprice = item.salesprice;
        returnItem.salesQty = item.returnQuantity;
        returnItem.currencyCode = item.currencyCode;
        returnItem.dataareaid = item.dataareaid;
        returnItem.inventsizeid = item.inventsizeid;
        returnItem.custAccount = item.custAccount;
        returnItem.configId = item.configId;
        returnItem.numberSequenceGroupId = item.numberSequenceGroupId;
        returnItem.inventLocationId = item.inventLocationId;
        returnItem.isItemFree = item.isItemFree;
        returnItem.linkId = item.linkId;
        returnItem.numberSequenceGroupId = item.numberSequenceGroupId;
        returnItem.vat = item.vat;
        returnItem.appliedDiscounts = [];
        returnItem.colorantprice = item.colorantprice;
        returnItem.colorantId = item.colorantId;
        returnItem.taxGroup = item.taxGroup;
        returnItem.taxItemGroup = item.taxItemGroup;
    };
    return ReturnOrderAmountService;
}());
exports.ReturnOrderAmountService = ReturnOrderAmountService;
