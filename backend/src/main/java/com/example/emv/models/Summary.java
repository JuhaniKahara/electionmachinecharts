package com.example.emv.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(schema = "emv", name = "summary_statistics")
@Data
public class Summary {
    @Id @JsonIgnore
    String id;
    Integer questionId;
    Integer answer;
    Integer numAnswers;
    Integer partyId;


}
