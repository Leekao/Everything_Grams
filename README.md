# Everything_Grams
Transforms everything to grams (works only on allrecipes, barely working)

# Installation
1. Clone the repo
2. Open "chrome://extentions" on the browser
3. Add the extension ('load unpacked extension' and select the folder)
4. Refresh your recipe tab
5. PROFIT

# Known Issues
* only change the quantities on the ingrdients list, not the recipe itself, working on that currently.
* all teaspoons are considered sugar teapoons (4.26 grams), flour teaspoons are 2.6 grams), I'm working on a patch for that
* no accessibility, I'll work on changing the alts sometime soon
* I'm using eval to handle "3/4" strings, so the guys at allrecipes could potentially inject code and the extension will run it, I'll take care of it soon.
