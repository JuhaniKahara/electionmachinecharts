package com.example.emv;

import com.example.emv.dao.*;
import com.example.emv.models.Candidate;
import com.example.emv.models.Constituency;
import com.example.emv.models.Party;
import com.example.emv.models.QuestionCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;

@Component
@ConditionalOnProperty(value = "migration.enabled", havingValue = "true")
public class MigrationService {

    @Autowired
    CandidateDao candidateDao;

    @Autowired
    AnswerDao answerDao;

    @Autowired
    ConstitutiencyDao constituencyDao;

    @Autowired
    PartyDao partyDao;

    @Autowired
    QuestionDao questionDao;


    @EventListener(ApplicationReadyEvent.class)
    public void afterApplicationStartup() {
        String baseUrl = "https://vaalit.yle.fi/vaalikone/eduskuntavaalit2023/api/public/constituencies/";
        RestTemplate restTemplate = new RestTemplate();
        Constituency[] constituencies = restTemplate.getForEntity(baseUrl, Constituency[].class).getBody();
        constituencyDao.saveAll(Arrays.asList(constituencies));
        for (Constituency constitutiency : constituencies){
            // An API with all the parties was not found, so we have to query for parties per constituency
            Party[] parties = restTemplate.getForEntity(baseUrl + constitutiency.getId() + "/parties" , Party[].class).getBody();
            partyDao.saveAll(Arrays.asList(parties));

            // Questions also have only constitutiency based APIs
            QuestionCategory[] questionCategories = restTemplate.getForEntity(baseUrl + constitutiency.getId() + "/questions" , QuestionCategory[].class).getBody();
            for (QuestionCategory questionCategory: questionCategories){
                questionDao.saveAll(questionCategory.getQuestions());
            }

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
