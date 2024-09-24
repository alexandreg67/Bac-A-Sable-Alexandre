CREATE DATABASE ma_base_de_donnees;

CREATE TABLE Repo (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    nom VARCHAR(255) NOT NULL,          
    url VARCHAR(255) NOT NULL,          
    statut_id INT,                      
    FOREIGN KEY (statut_id) REFERENCES Statut(id) ON DELETE SET NULL
);

CREATE TABLE Statut (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    nom_statut VARCHAR(100) NOT NULL    
);

CREATE TABLE Commentaire (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    repo_id INT,                        
    contenu_commentaire TEXT NOT NULL,  
    FOREIGN KEY (repo_id) REFERENCES Repo(id) ON DELETE CASCADE
);

CREATE TABLE Langage (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    nom_langage VARCHAR(100) NOT NULL   
);

CREATE TABLE Repo_Langage (
    repo_id INT,                        
    langage_id INT,                     
    PRIMARY KEY (repo_id, langage_id),  
    FOREIGN KEY (repo_id) REFERENCES Repo(id) ON DELETE CASCADE,
    FOREIGN KEY (langage_id) REFERENCES Langage(id) ON DELETE CASCADE
);