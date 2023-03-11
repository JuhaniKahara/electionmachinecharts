package com.example.emv.dao;

import com.example.emv.models.Answer;
import com.example.emv.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerDao extends JpaRepository<Answer, Integer> {
}
