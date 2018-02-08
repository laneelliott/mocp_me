USE mocp_db;

DROP TABLE IF EXISTS tags;

CREATE TABLE Tags  (
  id INT NOT NULL AUTO_INCREMENT,
  tag_name VARCHAR(100) NOT NULL,
  photo_id INT,
  FOREIGN KEY (photo_id) REFERENCES photos(id),
  PRIMARY KEY (id)
);