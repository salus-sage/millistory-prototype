# millistory-prototype
A prototype front end modelling and renderer for MilliStory

## Concept
Catalog: is a service which consists of all the artefacts required in
the story.
the id is a unique reference, should start with ```_``` "underscore"

Artefacts: consists of the resources to be rendered with other 
type specific to content-type

Story: is just a list of references to the catalog, 
with styling and section
ref column will contain the id from the catalog


## Types
Current Types that can be used in the catalog

banner: banner image for the story

title: Title for the story

heading: heading of a section

paragraph: This cell can take html in case of multiple paragraphs,
wrap each in ```<p> </p>```` tag.

paragraph:blockquote: is a block quote

image:slide: renders one or many images, optional caption and rights

inline:audio: audio inline to it's previous paragraph, optional caption and rights

block: audio: block audio in new line, optional caption and rights

inline:link: anchor links, and link text


### TODO
layout based on the align column
enhancements to rendered to handle banner
iniline:audio and block:audio
handling resource captions
style enhancements
Documentation and guides

