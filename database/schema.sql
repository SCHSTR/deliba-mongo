CREATE DATABASE discorddb;

CREATE TABLE pacotes (
    user_id VARCHAR(255),
    telegram_user VARCHAR(255),
    track_code VARCHAR(13) NOT NULL,
    status VARCHAR(255),
    local VARCHAR(255),
    origem VARCHAR(255),
    destino VARCHAR(255)
);