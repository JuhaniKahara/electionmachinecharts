package com.example.emv.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "emv", name = "constituency")
@Data
public class Constituency {

    @Id
    Integer id;

    String name_fi;
}
