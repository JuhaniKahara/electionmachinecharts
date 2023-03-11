package com.example.emv.dao;

import com.example.emv.models.Summary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SummaryDao extends JpaRepository<Summary, Integer> {
}
