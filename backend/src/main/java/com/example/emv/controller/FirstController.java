package com.example.emv.controller;

import com.example.emv.dao.ConstitutiencyDao;
import com.example.emv.dao.PartyDao;
import com.example.emv.dao.SummaryDao;
import com.example.emv.models.Constitutiency;
import com.example.emv.models.Party;
import com.example.emv.models.Summary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FirstController {

    @Autowired
    ConstitutiencyDao constitutiencyDao;

    @Autowired
    SummaryDao summaryDao;

    @Autowired
    PartyDao partyDao;

    @GetMapping("/party")
    public List<Party> getParties (){
        return partyDao.findAll();
    }

    @GetMapping("/summary")
    public List<Summary> getData (@RequestParam(required = false) Integer questionId){
        return summaryDao.findAllByQuestionIdOrderByPartyIdAsc(questionId);
    }

}
