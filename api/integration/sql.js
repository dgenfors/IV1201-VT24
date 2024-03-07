/**
 * Checks if the provided credentials match any user in the database.
 * @param {string} username - The username to check.
 * @param {string} password - The encrypted password to check.
 * @returns {string} The SQL query to check if credentials match with a existing account.
 */
const checkIfCredentialsMatch = function(username, password) {
    return 'SELECT EXISTS(SELECT 1 FROM person WHERE username=\'' + username + '\' AND password=\'' + password + '\');'
}

/**
 * Checks the role ID of the user.
 * @param {string} username - The username to check.
 * @returns {string} The SQL query to check the role ID.
 */
const checkRoleID = function(username) {
    return 'SELECT role_id FROM person WHERE username=\'' + username + '\';'
}

/**
 * Checks if any field (username, email, personal number) is already in use.
 * @param {string} username - The username to check.
 * @param {string} email - The email to check.
 * @param {string} pnr - The personal number to check.
 * @returns {string} The SQL query to check if any field is already used.
 */
const checkIfAnyFieldNotUsed = function(username, email, pnr) {
    return 'SELECT EXISTS (SELECT 1 FROM person WHERE username = \'' + username + '\') AS username_exists, EXISTS (SELECT 1 FROM person WHERE email = \''+ email +'\') AS email_exists, EXISTS (SELECT 1 FROM person WHERE pnr = \''+ pnr +'\') AS personal_number_exists,NOT EXISTS (SELECT 1 FROM person WHERE username =\'' + username + '\' OR email = \''+ email +'\' OR pnr = \''+ pnr +'\') AS success;'
}

/**
 * Creates a new user account in the database.
 * @param {UserDTO} userDTO - The user data transfer object.
 * @returns {string} The SQL query to create a new account.
 */
const createNewAccount = function(userDTO) {
    return 'INSERT INTO public.person(name, surname, pnr, email, password, role_id, username) VALUES (\''+userDTO.firstname+'\', \''+userDTO.lastname+'\', \''+userDTO.pnumbr+'\', \''+userDTO.email+'\', \''+ userDTO.password+'\', \'2\' , \'' + userDTO.username+ '\');'
}

/**
 * Creates a new competence in the database.
 * @param {string} comp - The name of the competence.
 * @param {string} username - The username of the user.
 * @returns {string} The SQL query to create a new competence.
 */
const createCompetence = function(comp, username) {
    return 'INSERT INTO public.competence(name) VALUES (\''+ comp +'\') ON CONFLICT (name) DO NOTHING;';
}

/**
 * Creates a new competence profile for a user in the database.
 * @param {object} competence - The competence object.
 * @param {string} username - The username of the user.
 * @returns {string} The SQL query to create a new competence profile.
 */
const createComp_profile = function(competence, username) {
    return 'INSERT INTO competence_profile (person_id, competence_id, years_of_experience) VALUES ((SELECT person_id FROM person WHERE username = \'' + username + '\'), (SELECT competence_id FROM competence WHERE name = \'' + competence.exp + '\'), '+ competence.year + ');';
}

/**
 * Creates a new availability record for a user in the database.
 * @param {object} availability - The availability object.
 * @param {string} username - The username of the user.
 * @returns {string} The SQL query to create a new availability record.
 */
const createAvailability = function(availability, username) {
    return 'INSERT INTO availability (person_id, from_date, to_date) VALUES ((SELECT person_id FROM person WHERE username = \'' + username + '\'), \'' + availability.startDate + '\', \'' + availability.endDate + '\');';
}

/**
 * Sets the application status of a user to unhandled in the database.
 * @param {string} username - The username of the user.
 * @returns {string} The SQL query to set the application status to unhandled.
 */
const setApplicationUnhandled = function(username) {
    return 'UPDATE person SET application_status=\'unhandled\' WHERE person_id = (SELECT person_id FROM person WHERE username = \'' + username + '\');';
}

/**
 * Lists all applications in the database.
 * @returns {string} The SQL query to list all applications.
 */
const listAllApplications = function() {
    return 'SELECT surname, name, application_status FROM person WHERE role_id =2 ORDER BY surname';
}

module.exports = {
    checkIfCredentialsMatch,
    checkIfAnyFieldNotUsed,
    createNewAccount,
    listAllApplications,
    checkRoleID,
    createCompetence,
    createComp_profile,
    createAvailability,
    setApplicationUnhandled
}
