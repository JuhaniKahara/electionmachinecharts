package com.example.emv.dao;

import com.example.emv.models.Candidate;
import com.example.emv.models.Constitutiency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateDao extends JpaRepository<Candidate, Integer> {
}
