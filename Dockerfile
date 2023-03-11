FROM tomcat:10.1.4-jdk17-temurin-jammy
EXPOSE 8080

ENV CATALINA_HOME /usr/local/tomcat
ENV PATH $CATALINA_HOME/bin:$PATH

COPY ./backend/build/libs/spring-boot-0.0.1-SNAPSHOT-plain.war /usr/local/tomcat/webapps/emv.war
CMD ["catalina.sh","run"]