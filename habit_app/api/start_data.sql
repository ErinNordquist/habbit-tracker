INSERT INTO USER (username)
values
('www');

INSERT INTO PASSWORD (username, password_hash)
values
('www','sha256$hChRaNpLE9fCT2Ph$c3db1321c7f6063a8f8c49c720290561f8f3515b97d86822b71448ca07b61226');

INSERT INTO HABIT (username, title, date_created)
values
('www','placeholder habit 1', '2021-06-11'),
('www','placeholder habit 2', '2021-06-04');

INSERT INTO HABIT_ACTION (username, habit_id, action_dttm)
values
('www', 1, DATE('2020-04-21')),
('www', 1, DATE('2021-06-12')),
('www', 1, DATE('2021-06-13')),
('www', 2, DATE('2021-06-11')),
('www', 2, DATE('2021-06-13'));
