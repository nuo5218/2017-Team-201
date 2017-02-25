"use strict";
function ApiErrorHandler(err, req, res, next) {
    console.log("ERROR");
    res.status(500).json({ error: "01", message: err.message });
}
exports.ApiErrorHandler = ApiErrorHandler;
//# sourceMappingURL=apiErrorHandler.js.map