package com.example.emv.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
public class QuestionCategory {

    Integer id;
    List<Question> questions;

}
