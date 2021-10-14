# urlShortner

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/repo-size/eswar2001/urlShortner)
![GitHub contributors](https://img.shields.io/github/contributors/eswar2001/urlShortner)
![GitHub stars](https://img.shields.io/github/stars/eswar2001/urlShortner?style=social)
![GitHub forks](https://img.shields.io/github/forks/seswar2001/urlShortner?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/_eswar2001?style=social)

This service will provide short aliases redirecting to long URLs.

# System Requiremnts

Our URL shortening system should meet the following requirements:  

## Functional Requirements:

1. Given a URL, our service should generate a shorter and unique alias of it. This is called a short link. This link should be short enough to be easily copied and pasted into applications.  
2. When users access a short link, our service should redirect them to the original link.  
3. Links will expire after a standard default timespan that is 15 days.  

## Non-Functional Requirements:

1. The system should be highly available. This is required because, if our service is down, all the URL redirections will start failing.  
2. URL redirection should happen in real-time with minimal latency.  
3. Shortened links should not be guessable (not predictable).  

## Extended Requirements:  

1. Our service should also be accessible through REST APIs by other services.  


# Using urlShortner

To use urlShortner, follow these steps:

```
git clone https://github.com/eswar2001/urlShortner.git
cd urlShortner
cd server
npm install
nodemon index.js
cd ..
cd client 
npm install
npm start 
```

Add run commands and examples you think users will find useful. Provide an options reference for bonus points!

# Contributing to urlShortner
<!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->
To contribute to urlShortner, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

# Contact

If you want to contact me you can reach me at <eswar.abisheak94@gmail.com>.

# License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: [MIT License](https://choosealicense.com/licenses/mit/).
