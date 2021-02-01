# BT

Hello!

Thanks for inviting me to the second stage.

I used Create React App (CRA) for this project, opted for TypeScript over JS (💛 the compile-time validation!) and Jest and Enzyme for my unit tests.

I was planning on hosting this on Netlify but sadly the News API in the brief is only free for development so you’ll have to run this locally (npm start) to play around.

There are a few things I’ve done in this project that I wouldn’t do in the real world, however chose to so in the interest of time:
- Security - I would never commit my env file with my API key 😄 but I did this so you’ll have it handy when you run the app
- Form validation - I would have opted for something like Formik to save myself the pain of trying to cater for a host of different scenarios! However as this was a test I thought it would be more valuable for me to add custom validation and hopefully I’ve covered the main cases/areas of concern
- Error messaging - I would amend this so the content doesn’t shuffle when it appears/disappears 
- CSS - I would have done more, possibly used styled components or at the very least SCSS and added fallback/polyfills for legacy browses to ensure cross-browser compatibility 

Hope this summary helps 👋 
