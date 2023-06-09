package com.example.emv.dao;

import com.example.emv.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question, Integer> {
    List<Question> findAllByConstituencyIdIsNull();
}
