
# Manual Overview

Hey! Here are the bugs found while manually testing the system.

Severity ranges from S1 (critical) to S5 (cosmetic).


| Title | What is happening? | Steps | Severity (S1-S5)| Screenshot or video | 
|------|------|------|------|------|
| Role is optional in the API request | There is a critical security issue in the API endpoint used to register new users. The role field in the registration request is currently optional. As a result, new users can be created without explicitly specifying a role.| 1. Create a POST request to api/auth/register with only email and password values <br> 2. Request is 200 even though important information is missing | S1 <br><br> Why: Misuse and issues regarding permissions might lead to legal actions so this issue is a high priority one | 
| Wrong user data displayed | I created some test users using the POST request above and their accounts always ended up with the same details which does not match the information sent when registering the users  | 1. Log into https://club-administration.qa.qubika.com/ with a test user  <br> 2. Go to https://club-administration.qa.qubika.com/#/user-profile <br> 3. The user details are wrong | S1 <br><br> Why: This issue affects the user reliability in the system and it is a potential security issue as the information shown does not match the user that logged into the system. | <img width="1418" height="702" alt="user_details" src="https://github.com/user-attachments/assets/1f40c037-9b49-4c13-b730-b5b583bfd26a" />
"" /> |
| UX issue | Some elements in the UI are misaligned or detached <br> <br> | 1. Access https://club-administration.qa.qubika.com/#/category-type <br> 2. Check the bottom of the page <br> 3. The pagination numbers are misaligned which reduces the usablity of the application | S2 <br><br> Why: The usage of the feature might be highly compromised due to the position of the paginations elements | <img width="1412" height="692" alt="pagination" src="https://github.com/user-attachments/assets/6f8ab53e-23c7-45f5-bc8f-d324ef63bade" /> |
