# Welcome to MoCP.me!

![alt text](/crispy.jpg?raw=true "The App")

This web application uses computer vision as a way to interact with the Museum of Contemporary Photography (MoCP) collection on user-generated terms.  Since 2012, the collection has been sorted into hashtags to provide students from all over Chicago better access to the online database - we hope to expand on this platform by developing a visual tagging system.  With our application, users will take photos that will be analyzed by [Google Vision](https://cloud.google.com/vision/) and return a relevant photo (based on the hashtags) from the MoCP collection.  The user will then be prompted to re-tag the photograph and to see other photographs tagged similarly. Our goal is to make these tags and the collection more accessible and relatable.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software:

```
  @google-cloud/vision
  express
  fs
  mysql2
  path
  sequelize
```

### Installing

All the prerequisities are dependencies in our package.json file, so simply run:

```
npm install
```

in your command line to get everything up and running!

### How the application works:

...carefully


## Potential Answers to Unlikely Questions

#### How was the database created?
The Museum of Contemporary Photography supplied us with an external hard drive of their entire collection of works. This hard drive contained nearly 7,000 folders named after particular artists which contained word documents, pdfs, and images.

In order for us to get a working database for this project we needed to sift through what was given to us and create a MySql database that contained only images. We created a node program that utilized both the mysql and fs (file system) node packages to read the data from the hard drive. Our first application sifted through each folder and write the name of that folder and the path to that folder to our artists database in MySql.

Once we had each of the artist folder paths in a database we then used a second node program that utilizes the previously made database folder paths to sift through each folder and pull out all the images in each folder and ignoring all of the extra files within each folder. Once this was completed we had a new table with the photo name, a foreign key for which folder it was found in and the image path. This gave us a MySql table with around 21,000 images in it.

Once this new table was completed we wrote a third node application to query all of our image paths and copy each of them into their own folder. This gave us a single folder with 21,000 images inside of it.

The next problem we ran into was how to make each of these images publicly accesible to users of our application. We elected to use the Google Cloud Platform storage to upload each of these images to. We attempted to upload all of these images into a bucket on Google Cloud Platform through the browser, but unfortunetly each time it crashed the browser. We had to utilize the Google Cloud Platform Shell Terminal to upload each image into our bucket. Next we used the terminal to give each of these images a public URL which is an option within the Google Cloud Platform bucket storage system. 

We then looked at a sample of the public urls and took the base url so that we can add it to our photos table. We then created another node application to query all of the images and write a new column into the table that added the base url from our Google Cloud Platform bucket and added the file name to finally give us a table that has each image with a url that can be accessed publicly from the web.

#### How were the tags added to each image in the database

Once we had our table with public urls we then had to create another node application that utilized the google vision node package that we use to reverse image search each image. This application queried each image and sent an api request to Google to return the relevant tags. Each time a tag was returned we wrote that data to a new MySql table that had the tag name and a foreign key that tied that tag back to the image id that it represents. We added some for loops in our application and let it run for nearly 6 hours. Once if finally completed we had a new sql table witch hundreds of thousands of searchable tags that can be joined to photos table to return a public image from the database.



## Contributors

* [Lane Anderson](https://github.com/laneelliott)
* [Wes Iza](https://github.com/izaweslie)
* [Holly Nwangwa](https://github.com/hnwangwa)
* [Amanda Yamasaki](https://github.com/amandayamasaki)
