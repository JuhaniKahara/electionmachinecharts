package com.example.emv;

import com.example.emv.dao.AnswerDao;
import com.example.emv.dao.CandidateDao;
import com.example.emv.dao.ConstitutiencyDao;
import com.example.emv.dao.PartyDao;
import com.example.emv.models.Candidate;
import com.example.emv.models.Constitutiency;
import com.example.emv.models.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@ConditionalOnProperty(value = "migration.enabled", havingValue = "true")
public class MigrationService {

    @Autowired
    CandidateDao candidateDao;

    @Autowired
    AnswerDao answerDao;

    @Autowired
    ConstitutiencyDao constitutiencyDao;

    @Autowired
    PartyDao partyDao;


    @EventListener(ApplicationReadyEvent.class)
    public void afterApplicationStartup() {
        String baseUrl = "https://vaalit.yle.fi/vaalikone/eduskuntavaalit2023/api/public/constituencies/";
        RestTemplate restTemplate = new RestTemplate();
        Constitutiency[] constitutiencies = restTemplate.getForEntity(baseUrl, Constitutiency[].class).getBody();
        constitutiencyDao.saveAll(Arrays.asList(constitutiencies));
        for (Constitutiency constitutiency : constitutiencies){
            // An API with all the parties was not found, so we have to query for parties per constitutiency
            Party[] parties = restTemplate.getForEntity(baseUrl + constitutiency.getId() + "/parties" , Party[].class).getBody();
            partyDao.saveAll(Arrays.asList(parties));

            // List of all candidates in the constitutiency
            Candidate[] candidates = restTemplate.getForEntity(baseUrl + constitutiency.getId() + "/candidates" , Candidate[].class).getBody();
            for (Candidate candidate : candidates){
                candidateDao.save(candidate);

                // This will fetch the election machine answers for a single candidate
                Candidate oneCandidate = restTemplate.getForEntity(
                        baseUrl + constitutiency.getId() + "/candidates/" + candidate.getId(), Candidate.class).getBody();
                answerDao.saveAll(oneCandidate.getAnswers());
            }

        }

    }
}
