// Let's build the helpers for building the views

document.onload = (function(U){
	console.log("loaded with front end catalog", U.catalog);

	// what do we need?
	// A frontend catalog which will be referred by the layout 
	// components - thinking out loud, cant say much now
	/*
	jus pasting the model here, so i can think,
	i guess i need $ref
	ncbsCat = {
		"id": "cat1",
		"type": "chapter",
		"title":"Identity",
		"description":" may be some curatorial note, or $ref(this.catalog, id)",
		"catalog": {
			"identity-intro": {
			"id": "id-intro",
			"type": "inline:text",
			"resource": {
				"id": "intro-id",
				"type": "text",
				"data": "In 1944, Homi Bhabha informed A.V. Hill, then Secretary of the Royal Society, that the Sir Dorabji Tata Trust had agreed to sponsor his proposal for a fundamental research institute in physics...."	
			}
		},
		"1-space-intro": {
			"id": "space-intro",
			"type": "inline:text",
			"resource": {
				"id": "intro-space",
				"type": "text",
				"data": "Nation building in the decades after Indian independence came with this patina of worship. The process included large scale science projects like dams and power plants, schools and universities. And it included new research centres....."	
			}
		},
*/


/*
*/

/*
Example: 
This whole below this looks like comes up as models
now we'll need types defined and bind with thhese models?

*/
M = {};
M.models = {};

//layout broker should check for column arguments and

// legal args 1 to 12
M.models.Layout = function(left, center, right){
	this.type = "section";
	this.catalog = {},
	this.columns = this.setLayout(left, center, right)
}

//Sections will create the global layout objects for stories
M.models.Layout.prototype = {
	getLayout: function(){
		try{
			return this.columns;
		}
		catch(error){
			console.log(error, "error");
		}
	},
	setLayout: function(left, center, right){
		return {
			left: left,
			center: center,
			right:right
		}

	},
	addBlocks: function(el, label, key, ordr, grp){
		if(label === "center" || label === "left" || label === "right"){
			this.catalog[key] = {el: el, area: label, order: ordr, group: grp};
		}
		//console.log(this.catalog[key]);
		return this.catalog[key];
	}
}

// content broker to access resources from catalog look up
M.models.Resource = function(catalog, id){
	this.data = catalog[id];
}

M.models.Resource.prototype = {
	//will return an array,
	// more on grammar later...

	getType: function() {
		var types = this.data.type.split(":");
		switch(types.length){
			case 2:
				return types[1];
				break;
			case 3:
			    return types[2];
			    break;
			default:
				return types[1];
		}
	},

	Get: function() {
		return this.data.resource;
	},
	Type: function() {
		return this.data.resource.type;
	},
	Data: function() {
		return this.data.resource.data;
	},
	Id: function() {
		return this.data.resource.id;
	}
}



// Broker object to interact with story and make,
// necessary frontend representations
M.models.storyBroker = function(arg){
	this.type = "repr";
	this.data = arg;
}

M.models.storyBroker.prototype = {
	getResource: function (arg){
		return this.data[arg];
	}

}


//================================================

// Here we are organising the templates
// using https://github.com/joestelmach/laconic/

M.templates = {};

M.templates.blockTemplates = {
	paragraphTpl: function(arg){
		console.log(arg, "from template");
		return $.el.p({name: arg.name}, $.el.div(arg.content.resource));
	},
	titleTpl: function(arg){
		//console.log(arg);
		return $.el.h1({name: arg.name}, arg.content.resource);
	},
	headingTpl: function(arg){
		return $.el.h2({name: arg.name}, arg.content.resource);
	},
	imgTpl: function(arg){
		console.log("image template");
		return $.el.img({src: arg.content.resource, name: arg.id});
	},
	bquoteTpl: function(arg){
		return $.el.blockquote({name: arg.name}, arg.content.resource);
	},
	linkTpl: function(arg){
		return $.el.a({name: arg.name, href: arg.content.resource}, arg.content.resource);
	},
	galleryTpl: function(list){
		return $.el.ul({name: arg.name}, 
						$.el.li({name: "gallery-item"},
							$.el.img({src: arg.src, name: arg.content.resource})
							));
		/*return list.map(function(item){
			if(item.type === 'image'){
				return this.imgTpl({src: item.src, name: item.id});
			}
			
		}, this);*/
	}
};

M.templates.layoutTemplates = function(section, content){
	if(section.getLayout().left > 0 && section.getLayout().center > 0 && section.getLayout().right > 0){
		return $.el.div({class: "row"}, 
				$.el.div({class: "col-md-"+section.getLayout().left, name: "left"}, content.left),
				$.el.div({class: "col-md-"+section.getLayout().center, name: "center"}, content.center),
				$.el.div({class: "col-md-"+section.getLayout().right, name: "right"}, content.right) );
	}	
}

//======================================================
// Here views!
M.views = {};

/*
Example:
var ex1 = new M.views.textView("text", M.templates.textTpl, "intro")
ex1.render({data: "Hello world", id: "name"});
will return..
compiled html node
*/


M.views.blockView = function(type, tpl, id){
	this.tpl = tpl;
	this.id = id;
	this.type = type;
}

M.views.blockView.prototype = {
	render: function(data){
		return this.tpl({content: data.data, name: this.id});
	}
}



//===========================================================================

M.views.pageView = function(story, catalog, layout, el){
	this.story = story.story;
	this.el = el;
	this.layout = layout;
	this.catalog = catalog;
}

M.views.pageView.prototype = {
	init: function(){
		console.log("initialized");
		this.render();
	},
	controller: function(){
		//console.log("controller", this.blocks, this.children);

	},
	templateResolver: function(type){
		// choose relevant template base on type
		switch(type){
			case 'title':
			return M.templates.blockTemplates.titleTpl;
			break;

			case 'heading':
			return M.templates.blockTemplates.headingTpl;
			break;

			case 'paragraph':
			return M.templates.blockTemplates.paragraphTpl;
			break;

			case 'inline:link':
			return M.templates.blockTemplates.linkTpl;
			break

			case 'image':
			return M.templates.blockTemplates.imgTpl;
			break;

			case 'image:slide':
			return M.templates.blockTemplates.imgTpl;
			break;

			case 'paragraph:blockquote':
			return M.templates.blockTemplates.bquoteTpl;
			break;

			case 'gallery':
			return M.templates.blockTemplates.galleryTpl;
			break;

			default:
			return M.templates.blockTemplates.paragraphTpl;
		} 
	},
	compileBlock: function(block, arg){
		var compiledBlock, blockIfArray;
		var self=this;
		if(U.isHTML(arg.resource)){
			console.log("html resource");
			blockIfArray = U.nodeToTxt(arg.resource);
			blockIfArray.forEach(function(txt){
				if(txt){

					compiledBlock = block.el({
						name: arg.id, 
						content: {
							resource: txt
						}
					});
					self.$el.appendChild(compiledBlock);
						//console.log(txt, compiledBlock);
				}
				
			});
			return null;
		}
		return compiledBlock = block.el({name: arg.id, content: arg});
	},
	render: function(){
		var self = this;
		self.$el = document.getElementById(this.el);
		self.$el.inneHTML = "";
		self.story.forEach(function(item, index){ 

			var resource = self.catalog.getResource(item.ref);
			var block = self.layout.addBlocks(self.templateResolver(resource.type), item.align, item.ref, index, item.group);
			//console.log(resource, "resource");
			var compiledBlock, blockIfArray;
			if(block){

				compiledBlock = self.compileBlock(block, resource);
			
				if(compiledBlock){
					console.log(index, compiledBlock);
					self.$el.appendChild(compiledBlock);
				}
				
			}
			
		});

	}
}



//instantiate

var story = new M.models.storyBroker(M.catalog);
pageViewInstance = new M.views.pageView(window.story, new M.models.storyBroker(U.catalog), new M.models.Layout(4, 4, 4), 'page');
pageViewInstance.init();

console.log("page view instantiated, here is the page object", pageViewInstance);

})(window.U);