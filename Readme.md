# Form Builder
#### Library for creating data oriented html forms.

## Usage:

It is very simple to use:

```js
let data = [
	{ type: "text", name: "first_name", label: "First Name", value: "John" },
	{ type: "text", name: "last_name", value: "Doe" }
];
const formz = document.getElementById('exampleForm');
const formBuilder = new FormBuilder(formz, data);
```

You can also pass the selector of the element when initiating the class:
```js
...
const formBuilder = new FormBuilder('#exampleForm', data);
```
You can also use it with Jquery:

```js
...
const formBuilder = $('#exampleForm').FormBuilder(data);
```

## [Attributes to add and their default values:](#attributes-table)

Attribute | Example | Descriptioin | Default Value
--- | --- | --- | ---
name | first_name | the name attribute of the input | No Default Value
type | textarea | the type of input you want it can have the usual values for html input tag (text, number, hidden ...) and it can also have the value of 'select' to create dropdown list or 'textarea' to create textarea element | text
value | John | it will be the default value of the field | No Default Value
label | First Name | The name that will show to user above the field | the value of name attribute converted to title format
id | first-name | the id attribute of the input field | No Default Value
class | first-name | the class attribute of the input field | No Default Value
container_class | first-name-container | the class attribute of the div that contains input field |No Default Value
placeholder | First Name | the placeholder attribute of the input field | No Default Value
options | ["John Doe"] | the list of options for if you choose type to be 'select' | No Default Value
attrs | onchange="inputChanged" | any custom attributes you want to add to the input field | No Default Value
error | First Name is required | the error message to show the user if there's an error | No Default Value
html | ```<button>Click Me</button>``` | html code to add if type attribute = raw_html | No Default Value

## Select Box:
If you want to make a select box you need to do something like this
```js
{ type: "select", name: "city", options: ['New York', 'London'], value: "London" }
```

In previous example both name and value of options are going to be: `New York`` and ``London``
But if you want to make the value different from name for the option you can do:
```js
{ type: "select", name: "city", options: [{name: 'New York', value: 'new_york'}, {name: 'London', value: 'london'}], value: "london" }
```
In previous example for each option ``name`` is what will appear for the user, where the actual value is ``value``

## Raw HTML

What if you want to create an element of your own like an `img` tag or an `<h2>` element?

In that case you can always set the type as `raw_html` like this:
```js
{ type: "raw_html", value: "<h2>Hi There</h2>" }
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
