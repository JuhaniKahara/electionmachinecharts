package com.example.emv.dao;

import com.example.emv.models.Constitutiency;
import com.example.emv.models.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartyDao extends JpaRepository<Party, Integer> {
}
