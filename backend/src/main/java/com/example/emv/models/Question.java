package com.example.emv.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;


@Data
@Entity
@Table(schema = "emv", name = "question")
public class Question {

    @Id
    Integer id;

    @JsonProperty("text_en")
    String textEn;

    @JsonProperty("text_fi")
    String textFi;

    // Unfortunately we need to have constituency id and filter out all questions that have non null value
    // because the same question might have different id in different constitutiency
    @JsonProperty("constituency_id")
    Integer constituencyId;

}
