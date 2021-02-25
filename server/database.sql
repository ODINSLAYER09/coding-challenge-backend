CREATE DATABASE userdirectory;

CREATE TABLE userinfo(
    user_id uuid DEFAULT uuid_generate_v4 (),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    PRIMARY KEY (user_id)
);

ALTER TABLE userinfo
ADD COLUMN home_currency VARCHAR NOT NULL;

ALTER TABLE userinfo
ADD CONSTRAINT email_unique UNIQUE (email);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    s_email VARCHAR NOT NULL,
    s_amount VARCHAR NOT NULL,
    s_home_currency VARCHAR NOT NULL,
    transaction_date VARCHAR NOT NULL,
    r_email VARCHAR NOT NULL,
    r_amount VARCHAR NOT NULL,
    r_home_currency VARCHAR NOT NULL,
    conversion_rate VARCHAR NOT NULL,
    t_notes VARCHAR
);

ALTER TABLE transactions
ADD CONSTRAINT r_email CHECK (r_email <> '');

ALTER TABLE transactions
ADD CONSTRAINT s_amount CHECK (s_amount <> '');