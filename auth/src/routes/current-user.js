"use strict";
exports.__esModule = true;
exports.currentUserRouter = void 0;
var express_1 = require("express");
var common_1 = require("@rshub/common");
var router = express_1["default"].Router();
exports.currentUserRouter = router;
router.get('/api/users/currentuser', common_1.currentUser, function (req, res) {
    res.send({ currentUser: req.currentUser || null });
});
