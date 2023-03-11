package com.example.emv.dao;

import com.example.emv.models.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConstitutiencyDao extends JpaRepository<Constituency, Integer> {
    List<Constituency> findAll();
}
