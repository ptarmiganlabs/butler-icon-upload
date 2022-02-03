<h1 align="center">
<img src="./icon.png" alt="Butler Icon Upload logo">
</h1>
<h3 align="center">Butler Icon Upload makes it easy to use free, professional quality icons and images in Qlik Sense Enterprise on Windows</h3>
<p align="center">
<a href="https://github.com/ptarmiganlabs/butler-icon-upload"><img src="https://img.shields.io/badge/Source---" alt="Source"></a>
<a href="https://github.com/ptarmiganlabs/butler-icon-upload/actions/workflows/release-please.yml"><img src="https://github.com/ptarmiganlabs/butler-icon-upload/actions/workflows/release-please.yml/badge.svg?branch=master" alt="CI"></a>
</p>
<br>
<br>
<br>
<br>


[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

# Features

* Thousands of free icons available, including Google Material Design, Font Awesome and others.
* Batch upload of icons and images to Qlik Sense. No more 50-at-a-time uploads.
* Stand-alone executables available for Windows, Linux, Alpine Linux and macOS. 
* The tool was created with Qlik Sense Enterprise on Windows.

# Table of contents

- [Features](#features)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
  - [Extract icon files from icon fonts](#extract-icon-files-from-icon-fonts)
  - [Convert icons files to correct format](#convert-icons-files-to-correct-format)
  - [Installing Butler Sheet Icons](#installing-butler-sheet-icons)
    - [Stand-alone executables](#stand-alone-executables)
    - [Node.js application](#nodejs-application)
- [Finding icons](#finding-icons)
  - [Download icons](#download-icons)
- [Convert icons to bitmaps](#convert-icons-to-bitmaps)
- [Uploading icons to Qlik Sense](#uploading-icons-to-qlik-sense)
  - [Configuration](#configuration)
  - [Uploading icons](#uploading-icons)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [References & resources](#references--resources)

# Installation

Installation can be done in two ways.  
Both achieve the same end result, which is images uploaded to Qlik Sense.

There are a few pre-requisites that are common for both installation options, these are described first.

## Extract icon files from icon fonts

If you want to convert existing icon fonts to bitmap images, you need to install [Icon Font to PNG](https://github.com/Pythonity/icon-font-to-png).  
This tool is not needed if your images are already in bitmap (png) format.

Let's try it:

```bash
proton:butler-icon-upload goran$ icon-font-to-png
usage: icon-font-to-png [-h] [--list] [--download {font-awesome,octicons}]
                        [--ttf TTF-FILE] [--css CSS-FILE] [--size SIZE]
                        [--scale SCALE] [--color COLOR] [--filename FILENAME]
                        [--keep_prefix]
                        [icons [icons ...]]
icon-font-to-png: error: You have to provide CSS and TTF files
```

## Convert icons files to correct format

[ImageMagick](https://www.imagemagick.org) is a very powerful tool for working with image files.  
It may be difficult to run ImageMagick on a Windows computer, so Linux or OSX is recommended.

ImageMagick is used to modify the images so they get the correct size and aspect ratio for use as sheet icons.  
If this step is not done square images will appear as stretched when used as sheet icons.

```bash
➜  butler-icon-upload convert
Version: ImageMagick 7.1.0-19 Q16-HDRI x86_64 2021-12-22 https://imagemagick.org
Copyright: (C) 1999-2021 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI Modules OpenMP(5.0)
Delegates (built-in): bzlib fontconfig freetype gslib heic jng jp2 jpeg lcms lqr ltdl lzma openexr png ps tiff webp xml zlib
Compiler: gcc (4.2)
Usage: convert [options ...] file [ [options ...] file ...] [options ...] file

Image Settings:
  -adjoin              join images into a single multi-image file
  -affine matrix       affine transform matrix
  -alpha option        activate, deactivate, reset, or set the alpha channel
  -antialias           remove pixel-aliasing
...
```

## Installing Butler Sheet Icons

### Stand-alone executables

On the release page you find ZIP files with executables for different operating systems.


### Node.js application

This option is easiest to get started with.  
It uses stand-alone executable files that include everything needed to run Butler Icon Upload

The tool is built using Node.js, please refer to the [Node.js site](https://nodejs.org/en/) for installation instructions for your platform (OSX/Windows/Linux).  
The latest LTS version of Node.js is usually a good choice.  

Your milage on especially Windows may vary due to some libraries used by this tool not being available/fully working there.  
It's mainly the image manipulation parts that don't work well on Windows, the icon uploading part (i.e. the Node.js app) should be ok.
Linux should work without issues.



With that in place, you should install the actual upload tool.

* Download the tool from the [releases page](https://github.com/ptarmiganlabs/butler-icon-upload/releases). Use either the source code (which requires Node.js) 
* Unzip to suitable location, for example ~/butler-icon-upload. cd into this directory.
* Install dependencies by running `npm install`.


Test your work so far. You should see output similar to the below.

```bash
➜  butler-icon-upload node icon_uploader.js
Usage: icon_uploader.js -i [path/to/icon/files] -c [content library name]

Options:
      --version                Show version number                                                             [boolean]
  -i, --iconfolder             Path to directory where icon files are located                                 [required]
  -c, --contentlibrary         Name of Qlik Sense content library to which icons iwll be uploaded             [required]
      --upload-interval        Time to wait between icon uploads (milliseconds)                          [default: 2000]
      --upload-timeout         Time to wait for upload to complete (milliseconds)                        [default: 5000]
      --upload-retries         Number of retry attempts to make if an uploade fails                         [default: 5]
      --upload-retry-interval  Time to wait between retry attempts (milliseconds)                       [default: 10000]
  -h, --help                   Show help                                                                       [boolean]

Examples:
  node icon_uploader.js -i ./icons -c "My icons"  Uploads icons in ./icons folder to content library named "My icons"

for more information, please visit https://github.com/ptarmiganlabs/butler-icon-upload

Missing required arguments: iconfolder, contentlibrary, i, c
➜  butler-icon-upload
```




Great - you now have the tools needed to batch convert and upload icons and images to Qlik Sense.

# Finding icons

The "Butler Icon Upload" tool does not include any actual icons.  
Instead, you need to find these elsewhere. The good news is that there are various online resources from where you can download professional quality icon sets.

Some of the more commonly used icon sets are Google's [Material Design](https://material.io/icons/) and [Font Awesome](https://fontawesome.com/), but there are many others too.

If you download icons from some online source, you need to get a) a css file for the webfont, and b) the webfont file itself.

## Download icons

[IcoMoon](https://icomoon.io/app/#/select) works great for getting the needed icon resources.  
It is basically a web app that wraps some of the most common icon sets in a web UI.  
Select the icons you want - let it be 5 or 500 - click download and you are done.
The app also offers IcoMoon's own icon sets for purchase.

IcoMoon is very easy to use, but let's take a look at how the hundreds of icons in Font Awesome can be downloaded:

1. Go to IcoMoon's [selection page](https://icomoon.io/app/#/select).
2. Click the "Add Icons From Library" link.
3. Scroll down until you find the Font Awesome library. Add it.
4. Select the icons you are interested in, or select all icons by clicking the hamburger menu to the right, then "Select All".
5. Click the "Generate Font" link in the lower right.
6. After a few seconds you will get a download link. Click it to download the icons.
7. You now have a file called icomoon.zip. Unzip it to for example ~/butler-icon-upload/fonts/fontawesome. cd to that directory.

We are only interested in the style.css and fonts/icomoon.ttf files, the rest can be deleted.

# Convert icons to bitmaps

You are now ready to convert the icon webfonts to bitmap images.

First make sure you are in the correct place:

```bash
proton:fontawesome goran$ pwd
/Users/goran/code/butler-icon-upload/fonts/fontawesome
proton:fontawesome goran$ ls -la
total 80
drwx------@ 4 goran  staff    128 Mar 28 22:02 .
drwxr-xr-x  6 goran  staff    192 Mar 28 21:54 ..
drwxr-xr-x@ 6 goran  staff    192 Mar 21 09:21 fonts
-rwxr-xr-x@ 1 goran  staff  37863 Mar 21 09:21 style.css
proton:fontawesome goran$
```

Then run a small script in the "script" directory that will

1. Extract the images from the icon fonts. The square, exported images will be placed in a new folder called "exported".
2. Convert the images to the size and aspect ratio used by Qlik Sense sheet icons. The resulting images will be placed in a directory called "thumbnail".

```bash
proton:fontawesome goran$ ../../script/icon_square_to_rect.sh teal
~/code/butler-icon-upload/fonts/fontawesome ~/code/butler-icon-upload/fonts/fontawesome
Exporting icon '500px' as '500px.png'(256x256 pixels)
Exporting icon 'address-book' as 'address-book.png'(256x256 pixels)
Exporting icon 'address-book-o' as 'address-book-o.png'(256x256 pixels)
Exporting icon 'address-card' as 'address-card.png'(256x256 pixels)
...
...
Exporting icon 'yoast' as 'yoast.png'(256x256 pixels)
Exporting icon 'youtube' as 'youtube.png'(256x256 pixels)
Exporting icon 'youtube-play' as 'youtube-play.png'(256x256 pixels)
Exporting icon 'youtube-square' as 'youtube-square.png'(256x256 pixels)

All done
...
...
yoast.png
youtube-play.png
youtube-square.png
youtube.png
~/code/butler-icon-upload/fonts/fontawesome
proton:fontawesome goran$
```

The "thumbnail" folder now contains images suitable for upload to Qlik Sense.

# Uploading icons to Qlik Sense

## Configuration

The upload tool relies on certificates to authenticate with Qlik Sense. These needs to be made available to the upload tool:

1. Export a set of certificates from the Sense QMC.
2. Copy config/default_template.yaml to config/default.yaml
3. Edit default.yaml so it points to your Sense server and certificates.

Note!  
Using certificates is powerful and convenient, but you should be careful with the certificates - if they get in the wrong hand they will provide full access to your Sense environment.  
Thus keep tight control of them and always maintain strict firewall rules on your Sense server(s).  
This helps ensuring that access is only possible from desired network locations.

## Uploading icons

Before uploading the images to a Sense content library, please keep a couple of things in mind:

* The content library you upload images to must exist. You will get a 404 error if it doesn't.
* Existing images in the content library will be replaced, if there are uploaded images with same names as existing ones.
* Remember to set a suitable security rule on the content library, so (all or some) users can access the images.

Upload the images. Below a small set of three images are uploaded.

```bash
➜  butler-icon-upload node icon_uploader.js -c "Thumbnails (red)" -i ./../../butler-icon-upload/fonts/fontawesome/thumbnail_red --upload-interval 100
2022-02-01T14:40:08.620Z info: --------------------------------------
2022-02-01T14:40:08.621Z info: Starting Qlik Sense icon uploader
2022-02-01T14:40:08.621Z info: Log level: info
2022-02-01T14:40:08.621Z info: App version: 2.2.0
2022-02-01T14:40:08.621Z info: --------------------------------------
2022-02-01T14:40:08.622Z info: Using icons in folder: /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red
2022-02-01T14:40:08.622Z info: Uploading icons to Qlik Sense content library: Thumbnails (red)
2022-02-01T14:40:08.622Z info: Image upload interval: 100 (ms)
2022-02-01T14:40:08.622Z info: Image upload timeout: 5000 (ms)
2022-02-01T14:40:08.622Z info: Image upload retry count: 5
2022-02-01T14:40:08.623Z info: Image upload retry interval: 10000 (ms)
2022-02-01T14:40:08.653Z info: 675 files added to upload queue
2022-02-01T14:40:08.655Z info: Uploading file (attempt 1): /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red/address-book-o.png
2022-02-01T14:40:09.258Z info: Uploading file (attempt 1): /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red/address-book.png
2022-02-01T14:40:09.666Z info: Uploading file (attempt 1): /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red/address-card-o.png
2022-02-01T14:40:10.080Z info: Uploading file (attempt 1): /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red/address-card.png
2022-02-01T14:40:10.496Z info: Uploading file (attempt 1): /Users/goran/code/butler-icon-upload/fonts/fontawesome/thumbnail_red/adjust.png
...
```

You should now be able to access the images from within Sense apps:

![Content library in Qlik Sense](./img/Icon_upload_demo_1.png "New icons available")

# Troubleshooting

* Make sure port 4242 (on the Sense server where QRS is running) accepts connections from the computer where you run the icon upload tool.
* Running the upload tool itself should be fine on Windows (not tested though). Running the image processing tools (Magick etc) will be difficult on Windows. Possibly possible, not tested though.

# Changelog

The changelog is available in the [changelog file](https://github.com/ptarmiganlabs/butler-icon-upload/blob/master/CHANGELOG.md).

# References & resources

* Additional DevOps/SenseOps related tools are available on my [Github page](https://github.com/ptarmiganlabs).
* Specifically relating to Qlik Sense icons, the [Butler Sheet Icons](https://github.com/ptarmiganlabs/butler-sheet-icons) makes it trivial to create sheet thumbnail icons in Qlik Sense apps.
* At [Ptarmigan Labs](https://ptarmiganlabs.com) you find various Qlik Sense related blog posts, including a couple on how to use icons in Qlik Sense.
* Qlik's [help pages](https://help.qlik.com) are good.
