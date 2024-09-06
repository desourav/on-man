# port-forward the database
kubectl port-forward -n on-man svc/mysql 3306:3306 &

brew install mysql-client
# access the database locally and create database
mysql -u root -ppassword -h 127.0.0.1 -e 'SHOW DATABASES;'
mysql -u root -ppassword -h 127.0.0.1 -e 'CREATE DATABASE `on-man`;'

mysql -u root -ppassword -h 127.0.0.1 -e 'CREATE TABLE `on-man`.`clinical-concept` (
	ID INT NOT NULL,
	concept varchar(100) NOT NULL,
	parent varchar(100) NULL,
	child varchar(100) NULL,
	alternateName varchar(100) NULL,
	PRIMARY KEY (ID)
);'




