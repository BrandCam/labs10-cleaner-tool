import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

type data = {
  stayId:number,
  surveyId:number
}

function baseQuery() {
  return db('stayssurveys');
}

function filterByStayId(stayId:number) {
  return (query: QueryBuilder) => query.where('stayssurveys.stay_id', stayId);
}

function filterBySurveyId(surveyId:number) {
  return (query: QueryBuilder) => query.where('stayssurveys.survey_id', surveyId);
}

function insertData(data: data) {
  return (query: QueryBuilder) => query.insert(data);
}

function formatData(data:data) {
  const { surveyId, stayId } = data;
  return { survey_Id: surveyId, stay_id: stayId };
}

export function postStaysSurveys(data:data) {
  const postData = formatData(data);
  const insert = insertData(postData);
  const completedQuery = insert(baseQuery());
  return completedQuery;
}

export function getSurveyByStayId(stayId) {
  const applyStayIdFilter = filterByStayId(stayId);
  const filteredQuery = applyStayIdFilter(baseQuery());
  return filteredQuery;
}