-- tworzenie bazy danych 
CREATE DATABASE perntodo;

-- tworzenie tabeli

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)