package com.example.emv.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "emv", name = "constitutiency")
@Data
public class Constitutiency {

    @Id
    Integer id;

    String name_fi;
}
