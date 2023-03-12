package com.example.emv.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "emv", name = "party")
@Data
public class Party {

    @Id
    Integer id;

    String name_fi;

}
