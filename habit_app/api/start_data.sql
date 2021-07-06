INSERT INTO USER (username)
values
('www'),
('zzz');

INSERT INTO PASSWORD (username, password_hash)
values
('www','sha256$hChRaNpLE9fCT2Ph$c3db1321c7f6063a8f8c49c720290561f8f3515b97d86822b71448ca07b61226'),
('zzz','sha256$JbtWyUHub1WbvB7J$7d5c44545a4bb34ecb8b0dd1eddd7e58ab20face96c4fff5207df3f46c2e18b8');

INSERT INTO HABIT (username, title, date_created)
values
('www','placeholder habit 1', '2021-06-11'),
('www','placeholder habit 2', '2021-06-04'),
('zzz', 'habit 1', '2021-06-15');

INSERT INTO HABIT_ACTION (username, habit_id, action_dt)
values
('www', 1, DATE('2020-04-21')),
('www', 1, DATE('2021-06-12')),
('www', 1, DATE('2021-06-13')),
('www', 2, DATE('2021-06-11')),
('www', 2, DATE('2021-06-13')),
('www', 2, DATE('2021-06-16')),
('zzz',3,DATE('2021-06-16'));
