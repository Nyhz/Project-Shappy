| ID  | METHOD | ROUTE                    | DESCRIPTION                  |
| --- | ------ | ------------------------ | ---------------------------- |
| 1   | GET    | /                        | Landing page                 |
| 2   | GET    | /login                   | Renders login form           |
| 3   | POST   | /login                   | Login into the web           |
| 4   | GET    | /register                | Renders register form        |
| 5   | POST   | /register                | Creates the user             |
| 6   | GET    | /logout                  | Destroys the session         |
| 7   | GET    | /home                    | Show recent activity         |
| 8   | GET    | /user/profile            | User profile                 |
| 9   | GET    | /user/profile/:userId    | Renders other user´s profile |
| 10  | GET    | /user/profile/edit       | Renders profile edit         |
| 11  | PUT    | /user/profile/edit       | Profile edit                 |
| 12  | DELETE | /user/profile/delete     | ""deletes the user""         |
| 13  | GET    | /group/create            | Renders group creation form  |
| 14  | POST   | /group/create            | Creates the group            |
| 15  | GET    | /group/:id/dashboard     | Renders group view           |
| 16  | POST   | /group/:id/dashboard/new | Creates new content          |
| 17  | DELETE | /group/:id/delete        | Deletes the group            |
| 18  | GET    | /shop                    | Renders shop                 |
