DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
  );

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published DATE NOT NULL DEFAULT CURRENT_DATE, 
  mainpic VARCHAR(255)
  
  );


DROP IF TABLE EXISTS hasCategory;
CREATE TABLE hasCategory (
id SERIAL PRIMARY KEY,
articleid INT,
categoryid INT,
FOREIGN KEY(articleid) REFERENCES articles(id) ON DELETE CASCADE,
FOREIGN KEY(categoryid) REFERENCES categories(id)
);

DROP IF TABLE EXISTS content
CREATE TABLE content (
id SERIAL PRIMARY KEY,
nodetype VARCHAR(255),
val VARCHAR(1024*1024),
);

DROP IF TABLE EXISTS hasParent
CREATE TABLE hasParent (
id SERIAL PRIMARY KEY,
childid INT,
parentid INT,
siblingorder INT,
FOREIGN KEY(childid) REFERENCES content(id) ON DELETE CASCADE,
FOREIGN KEY(parentid) REFERENCES content(id)
);






INSERT INTO categories (name) VALUES ('history'), ('battles'), ('empires'), ('kings'), ('fake_news');
INSERT INTO articles (title, author, published, mainpic) VALUES
('test','anselm',CURRENT_DATE,'http://fake.com/piture.jpg'),
('test2','anselm',CURRENT_DATE,'http://fake.com/piture.jpg'),
('test3','cemil',CURRENT_DATE,'http://fake.com/piture.jpg'),
('test4','cemil',CURRENT_DATE,'http://fake.com/piture.jpg');

INSERT INTO content (nodetype, val) VALUES
('entrypoint','test1'),
('heading-1','this is a large title'),
('heading-2','this is a less large title'),
('paragraph','this is a paragraph, containing ....:'),
('text','this is a leaf node');



