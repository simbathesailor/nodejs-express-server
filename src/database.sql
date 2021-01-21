

CREATE DATABASE house

CREATE TABLE user_table
(
   ID INT PRIMARY KEY NOT NULL,
   NAME TEXT NOT NULL,
   AGE INT NOT NULL,
   ADDRESS CHAR(50),
   SALARY REAL
);

-- /////////




select *
from public.user_table;


CREATE EXTENSION "uuid-ossp";

ALTER TABLE public.user_table
ALTER COLUMN user_id
SET DATA TYPE
uuid USING
(uuid_generate_v4
());