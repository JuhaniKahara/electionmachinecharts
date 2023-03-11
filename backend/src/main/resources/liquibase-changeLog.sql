
--changeset emv:1
create schema if not exists emv;
create table emv.constitutiency
    (
        id SERIAL NOT NULL,
        name_fi CHARACTER VARYING(255) NOT NULL,
        PRIMARY KEY (id)
    );

--changeset emv:2
create table emv.party
    (
        id integer NOT NULL,
        name_fi CHARACTER VARYING(255) NOT NULL,
        PRIMARY KEY (id)
    );

--changeset emv:3
create table emv.candidate
    (
        id INTEGER NOT NULL,
        first_name CHARACTER VARYING(255) NOT NULL,
        last_name CHARACTER VARYING(255) NOT NULL,
        election_number INTEGER,
        party_id INTEGER NOT NULL,
        constituency_id INTEGER NOT NULL,
        FOREIGN KEY(party_id) REFERENCES emv.party(id),
        PRIMARY KEY (id)
    );

--changeset emv:4
create table emv.answer
    (
        id SERIAL NOT NULL,
        question_id INTEGER NOT NULL,
        answer INTEGER NOT NULL,
        candidate_id INTEGER NOT NULL,
        FOREIGN KEY(candidate_id) REFERENCES emv.candidate(id),
        PRIMARY KEY (id)
    );
create index idx_answer_question_id ON emv.answer(question_id);

--changeset emv:5
create or replace view emv.summary_statistics AS
    select row_number() OVER () AS id, question_id, count(*) as num_answers, answer, c.party_id
    from emv.answer a
    join emv.candidate c on (a.candidate_id = c.id)
    group by c.party_id, question_id, answer;

--changeset emv:6
create or replace view emv.summary_statistics2 AS
    select row_number() OVER () AS id,
    question_id,
    count(*) FILTER (WHERE a.answer = 1) AS count_ones,
    count(*) FILTER (WHERE a.answer = 2) AS count_twos,
    count(*) FILTER (WHERE a.answer = 3) AS count_threes,
    count(*) FILTER (WHERE a.answer = 4) AS count_fours,
    c.party_id
    from emv.answer a
    join emv.candidate c on (a.candidate_id = c.id)
    group by c.party_id, question_id;