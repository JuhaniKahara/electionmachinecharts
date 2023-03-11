package com.example.emv.models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(schema = "emv", name = "candidate")
@Data
public class Candidate {
    @Id
    Integer id;

    String first_name;

    String last_name;

    Integer election_number;

    Integer party_id;

    Integer constituency_id;

    @Transient
    JsonNode answers;

    public List<Answer> getAnswers() {
        List<Answer> answers = new ArrayList<>();

        this.answers.fields().forEachRemaining(
                x->answers.add(new Answer(Integer.valueOf(x.getKey()),x.getValue().get("answer").intValue(), this.id)));
        return answers;
    }
}
