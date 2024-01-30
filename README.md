# New GULP project

> ## Technologies for studying:
>
> ### PUG
>
> https://pugjs.org/ - Pug is a high-performance template engine. (https://youtu.be/XemDmsmnYII)
>
> ### SCSS
>
> https://sass-lang.com/guide - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

> ## "Path Autocomplete" plugin for VS Code for alias path configuration (needed for development process)
>
> - install "Path Autocomplete" plugin for VS Code
> - add to the "settings.json" file (open VSCode "Settings">"User">"path-autocomplete">"Path Mappings">"Edit in settings.json"):

```
"path-autocomplete.pathMappings": {
    "@img": "${folder}/src/img",
    "@scss": "${folder}/src/scss",
    "@js": "${folder}/src/js",
    "@pages": "${folder}/src/html/pages",
    "@php": "${folder}/src/php",
    "@files": "${folder}/src/files",
},
```

> ## Project local deployment
>
> - clone the project locally with SSH or HTTPS using `git clone` command
> - open project folder with your IDE
> - install dependencies using `npm i` command

# Commands

```
npm i - to install dependencies
```

```
npm run dev - to start dev environment. Will start local server and open default browser. All pug, scss, js changes will cause page auto reload. For new fonts, images, videos, other files, lang.json and customLang.json restart the project for the changes to take effect
```

```
npm run build - to build the project. Will create builded project in the 'dist' with converted images into the '.webp' format, will create one common minified files for css and js files  respectively, will compile pug files into html.
```

````
npm run start - to build and start the project. Will create builded project as ```npm run build``` and will start local server. Needed to test how will look like the project on the server as there could be some styles differences from when you start the project using ```npm run dev```. For example, if you will add some image using 'img' tag and apply some styles, it probably will not work as you expect, as in the builded version GULP will cover 'img' tag with 'picture' tag and add sources. Тo changes in the code will be displayed automatically.
````

````
npm run zip - to build and zip the project. Will create builded project as ```npm run build``` and will zip the project.
````

````
npm run ftp - to build an upload the project to ftp server. Will create builded project as ```npm run build``` and will load it on the server. There are some configurations needed to be done in the 'gulp/config/ftp.js' file.
````
