enyo.depends(
	// Layout library
	"$lib/layout",
	// Onyx UI library
	"$lib/onyx",	// To theme Onyx using Theme.less, change this line to $lib/onyx/source,
	// CSS/LESS style files
	"style",

	"Recipe.js",
	"RecipeView.js",
	"StepView.js",
	"CookBook.js",
	"CookBookView.js",
	"Timer.js",
	// View kind definitions
	"views",
	// Include our default entry point
	"app.js"
);
