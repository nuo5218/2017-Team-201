"use strict";
var ORM = require("Sequelize");
var express = require("express");
var apiErrorHandler_1 = require("./apiErrorHandler");
var _ = require("lodash");
var bodyParser = require('body-parser');
var cors = require('cors');
var dbUrl = 'postgres://postgres:postgres@localhost:5432/hack4sd';
var options = { benchmark: true, logging: console.log };
var sequelize = new ORM(dbUrl, options);
var SuicideModel = sequelize.define('suicides', {
    condition_text: ORM.STRING,
    year_integer: ORM.INTEGER,
    geography_text: ORM.STRING,
    totalcase_numeric: ORM.FLOAT,
    totalrate_numeric: ORM.STRING
});
var MoodsModel = sequelize.define('mood_disorders_hospitalizations', {
    condition_text: ORM.STRING,
    year_integer: ORM.INTEGER,
    geography_text: ORM.STRING,
    totalcase_numeric: ORM.FLOAT,
    totalrate_numeric: ORM.STRING
});
var AnxietysModel = sequelize.define('anxiety_hospitalizations', {
    condition_text: ORM.STRING,
    year_integer: ORM.INTEGER,
    geography_text: ORM.STRING,
    totalcase_numeric: ORM.FLOAT,
    totalrate_numeric: ORM.STRING
});
var SelfInflicetedsModel = sequelize.define('self_inflicted_hospitalizations', {
    condition_text: ORM.STRING,
    year_integer: ORM.INTEGER,
    geography_text: ORM.STRING,
    totalcase_numeric: ORM.FLOAT,
    totalrate_numeric: ORM.STRING
});
var FacilitiesModel = sequelize.define('healthcare_facility_locations', {
    facid: ORM.INTEGER,
    facname: ORM.STRING,
    contact_phone: ORM.STRING,
    lat: ORM.FLOAT,
    lot: ORM.FLOAT
});
var SurveyModel = sequelize.define('Survey', {
    title: ORM.STRING,
    time: ORM.STRING,
    content: ORM.STRING
});
var app = express();
app.options('*', cors());
app.listen(8090, function () {
    console.log('The server is running!');
});
// body-Parser
app.use(bodyParser.json());
// API error handler
app.use(apiErrorHandler_1.ApiErrorHandler);
//Get hospital data
app.route('/api/suicide').get(function (req, res) {
    SuicideModel.findAll({
        attributes: ['id', 'condition_', 'year_', 'geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get hospital failed"));
});
app.route('/api/moods').get(function (req, res) {
    MoodsModel.findAll({
        attributes: ['id', 'condition_', 'year_', 'geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get moods failed"));
});
app.route('/api/anxietys').get(function (req, res) {
    AnxietysModel.findAll({
        attributes: ['id', 'condition_', 'year_', 'geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get anxietys failed"));
});
app.route('/api/selfinflicteds').get(function (req, res) {
    SelfInflicetedsModel.findAll({
        attributes: ['id', 'condition_', 'year_', 'geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get selfinflicteds failed"));
});
app.route('/api/facilities').get(function (req, res) {
    FacilitiesModel.findAll({
        attributes: ['facid', 'facname', 'contact_phone_number', 'latitude', 'longitude']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get facilities failed"));
});
app.route('/api/survey').post(apiCreateSurvey);
function apiCreateSurvey(req, res) {
    createSurvey(req.body)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Could not add survey"));
}
function createSurvey(props) {
    return SurveyModel.create(props);
}
function onError(res, message, err) {
    console.log("Promise chain error ", message, err);
    res.status(500).send();
}
function onSuccess(res, data) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    res.status(200).json(data);
}
//# sourceMappingURL=server.js.map