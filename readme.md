This is a static image gallery, which displays images by date in a calendar format.

#To add a new image to the gallery:

1. Open images.json
2. Find the year you want to add the image to
3. Find the month inside the image
4. Add the date for which the image is, (only 1 image per date)
5. To the date, add this object there:- {"url" : "path/to/image.jpg"}
6. The data in images.json follows this format:

   {

   "year1": {
   "Month1": {
   "date1": { "url": "path/to/image.jpg" }
   "date2": { "url": "path/to/image.jpg" }
   "date3": { "url": "path/to/image.jpg" }
   },
   "Month2": {
   "date1": { "url": "path/to/image.jpg" }
   "date2": { "url": "path/to/image.jpg" }
   "date3": { "url": "path/to/image.jpg" }
   }
   },
   "year2": {
   "Month1": {
   "date1": { "url": "path/to/image.jpg" }
   "date2": { "url": "path/to/image.jpg" }
   "date3": { "url": "path/to/image.jpg" }
   "date4": { "url": "path/to/image.jpg" }
   }
   }

}
