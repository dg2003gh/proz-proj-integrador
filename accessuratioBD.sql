-- POSTGRESQL ACCESSURATIO'S DATABASE DUMP
CREATE DATABASE accessuratio_site WITH ENCODING 'utf8';

USE accessuratio_site;

 -- DROP TEST COMMANDS
 
 DROP FUNCTION if EXISTS user_basic_data();
 DROP FUNCTION if exists user_rate();
 drop FUNCTION if EXISTS establishment_basic_data();

 
 -- TABLES
drop table if EXISTS demo;

CREATE table if not EXISTS accessuratio_user(
	pk_username varchar(20) PRIMARY KEY not NULL,
  	user_name VARCHAR(20) NOT NULL,
  	user_surname VARCHAR(20) NOT NULL,
  	user_photo BYTEA,
  	user_email VARCHAR(50) UNIQUE not NULL,
  	user_password varchar(50) not NULL
);

CREATE table if not EXISTS establishment_owner(
	owner_username VARCHAR(20) PRIMARY key,
  	owner_name VARCHAR(20),
  	email VARCHAR(100) UNIQUE,
  	owner_password VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS accessuratio_establishment(
  	pk_tax_id VARCHAR(50) PRIMARY key, 
  	fk_owner_username VARCHAR(20),
	establishment_name VARCHAR(50),
  	establishment_inauguration_date DATE,
  	establishment_premium BOOLEAN,
  	establishment_description TEXT,
  
	FOREIGN key(fk_owner_username) REFERENCES establishment_owner(owner_username)
);

CREATE table if not exists user_disabilities(
	disability_id SERIAL PRIMARY key,
  	fk_user_username VARCHAR(20),
  	user_disabilities_list VARCHAR(25),
  	FOREIGN KEY (fk_user_username) REFERENCES accessuratio_user(pk_username)
);

CREATE table if not EXISTS establishment_supported_disabilities(
	id SERIAL PRIMARY KEY,
  	supported_disability VARCHAR(30),
  	fk_tax_id VARCHAR(50),
  	FOREIGN KEY (fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id)
);

CREATE table if not EXISTS establishment_adress(
	pk_adress_id SERIAL PRIMARY KEY,
  	fk_tax_id VARCHAR(50),
  	establishment_number INT not NULL,
  	street VARCHAR(100) NOT NULL,
  	neiborhood VARCHAR(20) not NULL,
  	city VARCHAR(25) NOT NULL,
  	country CHAR(2) not NULL,
  	zip_code VARCHAR(25) not NULL unique,
  	FOREIGN KEY (fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id)
);

CREATE table if not exists establishment_tags(
	pk_tag_id SERIAL PRIMARY KEY,
  	fk_tax_id VARCHAR,
  	tag VARCHAR(25),
  	FOREIGN key(fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id)
);

CREATE table if not EXISTS establishment_telephone_list(
	pk_telephone_id SERIAL PRIMARY KEY,
  	fk_tax_id VARCHAR(50),
  	country_code INT not NULL,
  	area_code INT not NULL,
  	telephone_number VARCHAR(20) not NULL,
  	FOREIGN key(fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id)
);

CREATE table if not EXISTS establishment_rate(
	pk_rate_id SERIAL PRIMARY KEY,
  	rate SMALLINT not NULL CHECK(rate BETWEEN 0 and 4) ,
  	fk_tax_id VARCHAR(50),
  	fk_user_username VARCHAR(20),
  	FOREIGN key(fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id),
  	FOREIGN key(fk_user_username) REFERENCES accessuratio_user(pk_username)
);

CREATE table if not EXISTS establishment_images( /*Ver isso depois*/
	pk_image_id SERIAL PRIMARY KEY,
  	image BYTEA,
  	main_image BYTEA not NULL,
  	fk_establishment_tax_id VARCHAR(50),
  	FOREIGN key(fk_establishment_tax_id) REFERENCES accessuratio_establishment(pk_tax_id)
);

CREATE table if not EXISTS establishment_comments(
	pk_comment_id SERIAL PRIMARY KEY,
  	user_comment TEXT not NULL,
  	fk_tax_id VARCHAR(50),
  	fk_user_username VARCHAR(20),
  	FOREIGN key(fk_tax_id) REFERENCES accessuratio_establishment(pk_tax_id),
  	FOREIGN key(fk_user_username) REFERENCES accessuratio_user(pk_username)
);

-- TEST DATA --

INSERT INTO accessuratio_user(
	pk_username,
 	user_name,
  	user_surname,
  	user_email,
  	user_password
) 
VALUES
('caju88', 'ana', 'pereira', 'anazinha787@gmail.com', md5('123456')),
('rmdocker', 'ronaldo', 'guimarães', 'ronaldo32432@hotmail.com', md5('ewjrgewyut')),
('linuxuser45', 'maria', 'aparecida', 'aparecida12@outlook.com', md5('dfsk43765RET')),
('okara32','andré', 'luis', 'andre@gmail.com', md5('asdjhasdhj2'));

INSERT into user_disabilities(fk_user_username, user_disabilities_list)
VALUES
('caju88', 'vision deficiency'),
('rmdocker', 'wheelchair user'),
('caju88', 'wheelchair user');

INSERT INTO establishment_owner(
  owner_username, 
  owner_name, 
  email, 
  owner_password
)
VALUES
('happyRestaurant11', 'Luis', 'happyRestaurant@outlook.com', md5('waqewqwe')),
('visionmarket', 'ana', 'ana@gmail.com', md5('ana56GHKI')),
('marcus56', 'marcus', 'marcus23157.@marcus.com', md5('321764523'));

INSERT INTO accessuratio_establishment(
  pk_tax_id,
  fk_owner_username,
  establishment_name,
  establishment_inauguration_date,
  establishment_premium,
  establishment_description
)
VALUES
(md5('ny-3764443726'), 'happyRestaurant11', 'Happy restaurant', '2023-05-05', 'true', 'A perfect place for you and you family!'),
(md5('sp-321687432'), 'visionmarket', 'Vision Market', '2005-02-24', 'false', 'The market that looks for the future!'),
(md5('mg-432789432'), 'marcus56', 'açai do marcão', '2022-01-01', 'false', 'o açai do marcão é o melhor da cidade!');

INSERT into establishment_adress(
	fk_tax_id,
  	establishment_number,
  	street,
  	neiborhood,
  	city,
  	country,
  	zip_code
)
VALUES
(md5('ny-3764443726'), '68', 'pitagoras', 'Brooklywood', 'new york', 'US', '327-462'),
(md5('sp-321687432'), '1120', 'liberdade', 'são pedro', 'são paulo', 'BR', '32127-461232'),
(md5('mg-432789432'), '2132', 'rosas pereira', 'Brooklywood', 'Minas Gerais', 'BR', '323127-462321');

INSERT INTO establishment_telephone_list(
	fk_tax_id,
  	country_code,
  	area_code,
  	telephone_number
)
VALUES
(md5('ny-3764443726'), '01', '54', '15763258'),
(md5('sp-321687432'), '55', '11', '213123'),
(md5('mg-432789432'), '55', '32', '312321');

INSERT INTO establishment_tags(fk_tax_id, tag)
VALUES
(md5('ny-3764443726'), 'vision deficiency'),
(md5('sp-321687432'), 'wheelchair user'),
(md5('mg-432789432'), 'wheelchair user');

INSERT into establishment_supported_disabilities(
	fk_tax_id,
  	supported_disability
)
VALUES
(md5('ny-3764443726'), 'vision deficiency'),
(md5('sp-321687432'), 'wheelchair user'),
(md5('mg-432789432'), 'wheelchair user');

INSERT into establishment_rate( rate, fk_tax_id, fk_user_username)
VALUES
('4',md5('ny-3764443726'), 'caju88'),
('1',md5('sp-321687432'), 'rmdocker'),
('3', md5('mg-432789432'), 'caju88'),
('3', md5('sp-321687432'), 'caju88'),
('4', md5('sp-321687432'), 'linuxuser45');

insert into establishment_comments(user_comment, fk_tax_id, fk_user_username)
VALUES
('good place, well done!',md5('ny-3764443726'), 'caju88'),
('Lugar bacana!',md5('sp-321687432'), 'rmdocker'),
('Gostei, mas infelizmente não tem suporte a uma das minha deficiências...', md5('mg-432789432'), 'caju88'),
('Muito agradável', md5('sp-321687432'), 'caju88'),
('Legal, o espaço é ótimo para minha cadeira de rodas!', md5('sp-321687432'), 'linuxuser45');

-- FUNCTIONS

CREATE OR REPLACE FUNCTION alert_add_user()
    RETURNS TRIGGER
    as $$
    BEGIN
    	RAISE NOTICE 'NEW USER ADDED!';
        RAISE EXCEPTION 'ERROR TO ADD USER!';
    end; $$ LANGUAGE plpgsql;
    
CREATE or REPLACE FUNCTION user_basic_data()
	returns table
    (
    	username VARCHAR(20),
      	user_email VARCHAR(50),
      	user_disabilities VARCHAR(20)
    	
    )
	as $$
    BEGIN
		return QUERY select 
        pk_username as username, 
        accessuratio_user.user_email AS email,
        user_disabilities_list as disabilities
        from accessuratio_user
        JOIN user_disabilities 
        ON pk_username = fk_user_username;
	end; $$ LANGUAGE plpgsql;

CREATE or replace FUNCTION establishment_basic_data()
	RETURNS table(
    	owner_username VARCHAR,
        name VARCHAR,
        inauguration_date DATE,
        premium BOOLEAN,
      	establisment_zip_code VARCHAR,
      	average_rate NUMERIC
    ) 
    as $$
    BEGIN
    	RETURN QUERY SELECT
        fk_owner_username as owner_username,
        establishment_name,
        establishment_inauguration_date,
        establishment_premium,
        zip_code as establishment_zip_code,
        ROUND(avg(rate), 2) as average_rate
        from accessuratio_establishment
        JOIN establishment_adress as adress
        on pk_tax_id = adress.fk_tax_id
        JOIN establishment_rate
        on pk_tax_id = establishment_rate.fk_tax_id
        GROUP BY
        establishment_rate.fk_tax_id,
       	accessuratio_establishment.establishment_name,
        owner_username,
        establishment_inauguration_date,
        establishment_premium,
        establishment_zip_code
        ORDER by accessuratio_establishment.establishment_name;
    end; $$ LANGUAGE plpgsql;

-- PROCEDURES

CREATE OR REPLACE PROCEDURE DESACTIVATE_USER(username VARCHAR)
    as $$
    BEGIN
        DELETE FROM user_disabilities
        WHERE fk_user_username = username;
        DELETE from establishment_rate
        WHERE fk_user_username = username;
        DELETE from establishment_comments
        WHERE fk_user_username = username;
        DELETE from accessuratio_user
        WHERE pk_username = username;
    end; $$ LANGUAGE plpgsql;
    
-- TRIGGERS

CREATE TRIGGER alert
	AFTER INSERT
	on accessuratio_user
	FOR EACH ROW 
EXECUTE FUNCTION alert_add_user();
   
-- PROCEDURES CALLS
--CALL desactivate_user('rmdocker');

-- QUERIES

SELECT * FROM user_basic_data();
SELECT * from establishment_basic_data();

SELECT * from accessuratio_user;
