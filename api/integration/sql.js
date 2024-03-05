const checkIfCredentialsMatch = function(username, password){return 'SELECT EXISTS(SELECT 1 FROM person WHERE username=\'' + username + '\' AND password=\'' + password + '\');'}
const checkRoleID = function(username){return 'SELECT role_id FROM person WHERE username=\'' + username + '\';'}
const checkIfAnyFieldNotUsed = function(username, email, pnr){return 'SELECT EXISTS (SELECT 1 FROM person WHERE username = \'' + username + '\') AS username_exists, EXISTS (SELECT 1 FROM person WHERE email = \''+ email +'\') AS email_exists, EXISTS (SELECT 1 FROM person WHERE pnr = \''+ pnr +'\') AS personal_number_exists,NOT EXISTS (SELECT 1 FROM person WHERE username =\'' + username + '\' OR email = \''+ email +'\' OR pnr = \''+ pnr +'\') AS success;'}
const createNewAccount = function(userDTO){return 'INSERT INTO public.person(name, surname, pnr, email, password, role_id, username)VALUES (\''+userDTO.firstname+'\', \''+userDTO.lastname+'\', \''+userDTO.pnumbr+'\', \''+userDTO.email+'\', \''+ userDTO.password+'\', \'2\' , \'' + userDTO.username+ '\');'}
const createCompetence = function (comp, username){return 'INSERT INTO public.competence(name) VALUES (\''+ comp +'\') ON CONFLICT (name) DO NOTHING;'}
const createComp_profile = function(competence, username){return 'INSERT INTO competence_profile (person_id, competence_id, years_of_experience) VALUES ((SELECT person_id FROM person WHERE username = \'' + username + '\'), (SELECT competence_id FROM competence WHERE name = \'' + competence.exp + '\'), '+ competence.year + ');'}
const createAvailability = function(availability, username){return 'INSERT INTO availability (person_id, from_date, to_date) VALUES ((SELECT person_id FROM person WHERE username = \'' + username + '\'), \'' + availability.startDate + '\', \'' + availability.endDate + '\');'}

const createNewApplication = function(applicationDTO, username){
    for (let i = 0; i < applicationDTO.competence.length; i++) {
        if(i == 0){
            compet = '(\'' + applicationDTO.competence[0].exp + '\')'
            comp_profile = '((SELECT person_id FROM person WHERE username = \'' + username + '\'), (SELECT competence_id FROM competence WHERE name = \'' + applicationDTO.competence[0].exp + '\'), '+ applicationDTO.competence[0].year + ')'
            availa = '((SELECT person_id FROM person WHERE username = \'' + username + '\'), \'' + applicationDTO.availability[0].startDate + '\', \'' + applicationDTO.availability[0].endDate + '\')'
        }
        else{
            compet += ','
            comp_profile += ','
            availa += ','
            compet += '(\'' + applicationDTO.competence[i].exp + '\')'
            comp_profile += '((SELECT person_id FROM person WHERE username = \'' + username + '\'), (SELECT competence_id FROM competence WHERE name = \'' + applicationDTO.competence[i].exp + '\'), '+ applicationDTO.competence[i].year + ')'
        }
    }
    for (let i = 1; i < applicationDTO.availability.length; i++) {
        availa += '((SELECT person_id FROM person WHERE username = \'' + username + '\'), \'' + applicationDTO.availability[i].startDate + '\', \'' + applicationDTO.availability[i].endDate + '\')'
    }
    comp_profile += ';'
    availa += ';'
    return 'INSERT INTO competence (name) VALUES' + compet + ' ON CONFLICT (name) DO NOTHING; INSERT INTO competence_profile (person_id, competence_id, years_of_experience) VALUES' + comp_profile + 'INSERT INTO availability (person_id, from_date, to_date) VALUES' + availa
}
const listAllApplications= function(){
    return 'SELECT surname, name, application_status FROM person WHERE role_id =2 ORDER BY surname LIMIT 20'
}

module.exports = {checkIfCredentialsMatch, checkIfAnyFieldNotUsed, createNewAccount, createNewApplication, listAllApplications, checkRoleID, createCompetence, createComp_profile, createAvailability}