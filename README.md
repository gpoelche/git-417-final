# The Club Nintendo About Page: Enhancing User Experience with Basic Scripting

## Objective
This site was developed as the final project for my first JavaScript course. The requirements were a single-page, fixed-width 1280px site, themed around a brand, with validated HTML and CSS 
and no placeholder text. Additionally, basic JavaScript features were required to be implemented: toggleable theme button (light/dark), regex validation on form submission, and a basic 
shopping cart feature that allowed users to modify their cart. The intention of this page was to inform customers about the Club Nintendo program while also directing them to make purchases 
that accrue points within the system’s loyalty program.

## Synopsis
This page was largely inspired by much of the Nintendo branding across their digital spaces. As a Nintendo customer, I found myself familiar with the brand aesthetics and easily gathered 
colors/typefaces that match the then-current aesthetic used online. Regarding page content, I didn’t have particular sources of inspiration; I found myself analyzing and considering what 
important details users may want to know when signing up for the program, which drove the direction of the content placed into the project. Given that I also am a member of Nintendo’s 
current rewards system, I felt that my participation in the program provided me with a strong sense of what other users may want to see in order to increase user signup rates.

## Process
Like most projects, I began by wireframing the structure of the page. Research was performed shortly after completing wireframes to develop a brand outline, which would guide the visual 
direction of the project. Early development also included a dedicated drafting process for the page’s main body content. This was something I spent time refining since this was meant to 
persuade customers to make a certain decision. 
<br><br>
From there, I began working on the basic JavaScript features required for this submission. The theme toggle was quite simple with JavaScript, 
but required careful planning with CSS variables. The cart feature was originally required to be completed by using checkboxes that would update the cart. Instead, I built item cards that 
allowed for each item to be added or removed with the cart total dynamically updating. I believe that this was both much more professional in presentation and actually simpler to implement 
than the original required format. I then completed the scripting requirements by implementing regex checks against values users would enter into the contact form filled out at the bottom 
of the page. Regex was challenging for me to initially learn, which made this step take longer than expected. Online tools that help check values against regex strings were crucial in 
allowing me to complete this step faster. 
<br><br>
Lastly, I utilized my assembled brand outline to complete the CSS on this page. Due to the limited content on the page, this step was less 
challenging at the time than other stages of development. If this project were not fixed-width and required responsive design, this step of development would have certainly been much more demanding.

## Results
Overall, I was able to successfully complete this project well within the timeline given to me at the end of the class. I received praise from my professor on this project both presenting a 
believable level of realism and for exceeding expectations for the cart feature implementation. I consider this project to be one of the strongest examples of brand-consistent styling in my portfolio.
You can view more details on the project's [Behance page.](https://www.behance.net/gallery/239925013/GIT-417-Final-Club-Nintendo-Landing-Page)

## Gallery
<img width="2048" height="1486" alt="unnamed" src="https://github.com/user-attachments/assets/5d8df4be-6d36-48cd-9406-0b78348017c8" />
This is a screenshot of the hero section. The goal of this area is to immediately suggest users to link their MyNintendo account to the Club Nintendo program. Above is also quick links to various sections on the page and a toggleable theme button.
<br><br>
<img width="2048" height="1486" alt="unnamed (1)" src="https://github.com/user-attachments/assets/51a23dc8-21a1-4351-a0a2-f3137f95df48" />
This screenshot shows the mini-cart that is used to quickly show users the kinds of purchases that will accrue reward points for the Club Nintendo program. In practice, this is a simple way to directly convert traffic to sales.
<br><br>
<img width="2048" height="1486" alt="unnamed (2)" src="https://github.com/user-attachments/assets/1a37f6c2-c749-4fde-af3d-c3165aaa22ae" />
This section shows a formal area describing a special status that can be acquired through an application lower on the page. The section features a popular streamer who plays Nintendo games who could theoretically be an ambassador for this program.
<br><br>
<img width="2048" height="1486" alt="unnamed (3)" src="https://github.com/user-attachments/assets/5454b13f-0718-4906-8be5-3b8be8abd57e" />
This form is the application that users can complete to apply for the ambassador program. This performs basic regex comparisons against the values entered in each field, and toggles the required fields depending on the user’s selection of contact preferences.
