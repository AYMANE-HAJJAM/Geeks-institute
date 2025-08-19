select count(*) from actors

insert into actors (first_name, last_name) values ('aymane', 'hajjam') RETURNING *
--In PostgreSQL, the NOT NULL constraint prevents any insertion without a value in the specified column.

 