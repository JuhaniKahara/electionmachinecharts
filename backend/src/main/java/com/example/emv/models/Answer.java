package com.example.emv.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "emv", name = "answer")
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Integer question_id;

    Integer answer;

    Integer candidate_id;

    public Answer(Integer question_id, Integer answer, Integer candidate_id){
        this.question_id = question_id;
        this.answer = answer;
        this.candidate_id = candidate_id;
    }

}
