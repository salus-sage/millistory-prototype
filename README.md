# millistory-prototype
A prototype front end modelling and renderer for MilliStory

## Get Started
- First, create a copy of this google sheet. 
[MilliStory template](https://docs.google.com/spreadsheets/d/1RSzj7j8pdhA-bLhSP-8ofFfN-fs4PD2Bxp7-Q3HKHdM/edit#gid=2080781762)
- In the catalog sheet, each row is a resource with the type specified. see below for more on Types.
- In the story-template sheet, add the ref column which will be the ID from the catalog sheet.
The order of items in the story sheet will be the same when it is rendered in the browser, with a default theme.

## Guide
An example [sheet](https://docs.google.com/spreadsheets/d/1CqezhpQsicBRXPuEcJzjliER4LoxrmkI8wdcQPLT9Ts/edit#gid=0)
and the [Demo](https://salus-sage.github.io/millistory-prototype/)


## Concept
Catalog: is a service which consists of all the artefacts required in
the story.

The id is a unique reference, should start with ```_``` "underscore"

Artefacts: consists of the resources to be rendered with other 
type specific to content-type

Story: is just a list of references to the catalog, 
with styling and section. 

ref column will contain the id from the catalog


## Types
Current Types that can be used in the catalog

- banner: banner image for the story
- title: Title for the story
- heading: heading of a section
- paragraph: This cell can take html in case of multiple paragraphs,
wrap each in ```<p> </p>``` tag.
- paragraph:blockquote: is a block quote
- image:slide: renders one or many images, optional caption and rights
- inline:audio: audio inline to it's previous paragraph, optional caption and rights
- block: audio: block audio in new line, optional caption and rights
- inline:link- anchor links, and link text


### TODO
- layout based on the align column
- enhancements to rendered to handle banner
- iniline:audio and block:audio
- handling resource captions
- style enhancements
- Documentation and guides

