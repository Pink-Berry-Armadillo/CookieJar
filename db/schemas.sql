CREATE TABLE IF NOT EXISTS users_table (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    created_on TIMESTAMP,
    last_login TIMESTAMP 
)

CREATE TABLE IF NOT EXISTS cookie_table (
    cookie_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    cookie_name VARCHAR (255) NOT NULL,
    cookie_value VARCHAR (400) NOT NULL,
    cookie_description VARCHAR (500),
    FOREIGN KEY (user_id)
        REFERENCES users_table (user_id)
    
)

CREATE TABLE IF NOT EXISTS session_table (
    session_id serial PRIMARY KEY,
    sess_id VARCHAR (40) NOT NULL,
    ip_address VARCHAR (16) ,
    user_agent VARCHAR (50),
    last_activity TIMESTAMP,
    _access INT,
    user_data,
    cookie_id INT,
    FOREIGN KEY (cookie_id)
        REFERENCES cookie_table (cookie_id),
)
