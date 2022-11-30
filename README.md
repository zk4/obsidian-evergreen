# Obsidian "EverGreen" Plugin



[EverGreen](https://notes.andymatuschak.org/) workflow with stack tabs in Obsidian 



## Support Obsidian version

\>= 1.0.0



## Install

``` bash
yarn 
yarn build 
mv dist evergreen
```

move the evergreen folder to your {vault}.obsidian/plugins



## How to use

1. install this plugin 
2. enable `Stack tabs`

## Feature

1 Open internal link in stacked tab;


2 Reuse already opened tab if possible;

   

   

3 Keep only leaf to parent full tab history from link hierarchy, otherwise tab would be deleted;



Ex: Suppose you have these files in link:

A
  - B
    - C
    - D
      - H
      - C
    - E
  - F
    - G

![demo](./images/demo.gif)





 

plugin inspired by: [No Dupe Leaves](https://github.com/scambier/obsidian-no-dupe-leaves)

 



