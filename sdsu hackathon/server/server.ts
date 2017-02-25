import * as ORM from "Sequelize";
import { Sequelize,LoggingOptions } from 'Sequelize';
import * as express from 'express';
import { Application, Request, Response }from 'express';
import { ApiErrorHandler } from './apiErrorHandler';
import * as _ from 'lodash';

const bodyParser = require('body-parser');
const cors = require('cors');

const dbUrl = 'postgres://postgres:postgres@localhost:5432/hack4sd';

const options: LoggingOptions = {benchmark: true, logging:console.log};

const sequelize:Sequelize = new ORM (dbUrl,options);

const SuicideModel = sequelize.define('suicides',{
    condition_text:ORM.STRING,
    year_integer:ORM.INTEGER,
    geography_text:ORM.STRING,
    totalcase_numeric:ORM.FLOAT,
    totalrate_numeric:ORM.STRING
});

const MoodsModel = sequelize.define('mood_disorders_hospitalizations',{
    condition_text:ORM.STRING,
    year_integer:ORM.INTEGER,
    geography_text:ORM.STRING,
    totalcase_numeric:ORM.FLOAT,
    totalrate_numeric:ORM.STRING
});

const AnxietysModel = sequelize.define('anxiety_hospitalizations',{
    condition_text:ORM.STRING,
    year_integer:ORM.INTEGER,
    geography_text:ORM.STRING,
    totalcase_numeric:ORM.FLOAT,
    totalrate_numeric:ORM.STRING
});

const SelfInflicetedsModel = sequelize.define('self_inflicted_hospitalizations',{
    condition_text:ORM.STRING,
    year_integer:ORM.INTEGER,
    geography_text:ORM.STRING,
    totalcase_numeric:ORM.FLOAT,
    totalrate_numeric:ORM.STRING
});

const FacilitiesModel = sequelize.define('healthcare_facility_locations',{
    facid:ORM.INTEGER,
    facname:ORM.STRING,
    contact_phone:ORM.STRING,
    lat:ORM.FLOAT,
    lot:ORM.FLOAT
});

const SurveyModel = sequelize.define('Survey',{
    title:ORM.STRING,
    time:ORM.STRING,
    content:ORM.STRING
});


const app:Application = express();

app.options('*', cors());

app.listen(8090,()=>{
    console.log('The server is running!');
})

// body-Parser
app.use(bodyParser.json());
// API error handler
app.use(ApiErrorHandler);

//Get hospital data
app.route('/api/suicide').get((req:Request,res:Response)=>{

    SuicideModel.findAll({
        attributes: ['id','condition_', 'year_','geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get hospital failed"));

});


app.route('/api/moods').get((req:Request,res:Response)=>{

    MoodsModel.findAll({
        attributes: ['id','condition_', 'year_','geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get moods failed"));

});

app.route('/api/anxietys').get((req:Request,res:Response)=>{

    AnxietysModel.findAll({
        attributes: ['id','condition_', 'year_','geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get anxietys failed"));

});

app.route('/api/selfinflicteds').get((req:Request,res:Response)=>{

    SelfInflicetedsModel.findAll({
        attributes: ['id','condition_', 'year_','geography', 'total_case', 'total_rate']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get selfinflicteds failed"));

});


app.route('/api/facilities').get((req:Request,res:Response)=>{

    FacilitiesModel.findAll({
        attributes: ['facid','facname', 'contact_phone_number','latitude', 'longitude']
    })
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Get facilities failed"));

});

app.route('/api/survey').post(apiCreateSurvey);


function apiCreateSurvey(req:Request, res:Response) {
    createSurvey(req.body)
        .then(_.partial(onSuccess, res))
        .catch( _.partial(onError, res, `Could not add survey`) );

}

function createSurvey(props: any) {
    return SurveyModel.create(props);
}

function onError(res: Response, message: string, err:any){
    console.log("Promise chain error ", message, err);
    res.status(500).send();
}

function onSuccess(res:Response, data: any){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    res.status(200).json(data);
}