CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	content VARCHAR(255) NOT NULL,
	status BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todos (content) VALUES ('Finish Prime weekend assignment'), ('Do my laundry'), ('Write letter of recommendation');