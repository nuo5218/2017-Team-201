CREATE EXTENSION postgis;


DROP TABLE IF EXISTS Anxiety_Hospitalization;
DROP TABLE IF EXISTS Suicide_Death;
DROP TABLE IF EXISTS Self_Inflicted_Hospitalization;
DROP TABLE IF EXISTS Mood_Disorders_Hospitalization;
DROP TABLE IF EXISTS Healthcare_Facility_Locations;





CREATE TABLE Anxiety_Hospitalization (Geography text, CONDITION_ text, YEAR_ int, total_case numeric, total_rate numeric);


CREATE TABLE Suicide_Death (id serial NOT NULL, Geography text, CONDITION_ text, YEAR_ int, total_case numeric, total_rate numeric);

CREATE TABLE Self_Inflicted_Hospitalization (Geography text, CONDITION_ text, YEAR_ int, total_case numeric, total_rate numeric);

CREATE TABLE Mood_Disorders_Hospitalization (Geography text, CONDITION_ text, YEAR_ int, total_case numeric, total_rate numeric);

CREATE TABLE Healthcare_Facility_Locations (FACID int, FACNAME text, CONTACT_PHONE_NUMBER text, LATITUDE numeric, LONGITUDE numeric); 



copy Anxiety_Hospitalization FROM 'Anxiety_Hospitalization_2010-2013.csv' DELIMITER as ',' CSV HEADER;

copy Suicide_Death FROM 'Suicide_Death_2010-2013.csv' DELIMITER as ',' CSV HEADER;

copy Self_Inflicted_Hospitalization FROM 'Self_Inflicted_Hospitalization_2010-2013.csv' DELIMITER as ',' CSV HEADER;

copy Mood_Disorders_Hospitalization FROM 'Mood_Disorders_Hospitalization.csv' DELIMITER as ',' CSV HEADER;

copy Healthcare_Facility_Locations FROM 'Healthcare_Facility_Locations.csv' DELIMITER as ',' CSV HEADER;


ALTER TABLE Healthcare_Facility_Locations ADD column location geometry; 

UPDATE Healthcare_Facility_Locations SET
  location = ST_SetSRID(ST_MakePoint(LONGITUDE, LATITUDE), 4326);


UPDATE Anxiety_Hospitalization SET total_case=0 where total_case = Null; 
UPDATE Anxiety_Hospitalization SET total_rate=0 where total_rate = Null; 

UPDATE Suicide_Death SET total_case=0 where total_case = Null; 
UPDATE Suicide_Death SET total_rate=0 where total_rate = Null; 

UPDATE Self_Inflicted_Hospitalization SET total_case=0 where total_case = Null; 
UPDATE Self_Inflicted_Hospitalization SET total_rate=0 where total_rate = Null; 

UPDATE Mood_Disorders_Hospitalization SET total_case=0 where total_case = Null; 
UPDATE Mood_Disorders_Hospitalization SET total_rate=0 where total_rate = Null; 





ALTER TABLE Anxiety_Hospitalization ADD PRIMARY KEY (Geography)
ALTER TABLE Suicide_Death ADD PRIMARY KEY (Geography)
ALTER TABLE Self_Inflicted_Hospitalization ADD PRIMARY KEY (Geography)
ALTER TABLE Mood_Disorders_Hospitalization ADD PRIMARY KEY (Geography)

                                                                                                       
                                                                                                       
                                                                                                       
                                                                                                       