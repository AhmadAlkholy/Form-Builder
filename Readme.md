# Form Builder

## Usage:

It is very simple to use:

```js
let data = [
	{type: "text", name: "first_name", label: "First Name", value: "John"},
	{type: "text", name: "last_name", value: "Doe"}
];
const formz = document.getElementById('exampleForm');
const formBuilder = new FormBuilder(formz, data);
```

You can also pass the selector of the element when initiating the class:
```js
...
const formBuilder = new FormBuilder('#exampleForm', data);
```
You can only use it with Jquery:

```js
...
const formBuilder = $('#exampleForm').FormBuilder(data);
```

## Attributes to add and their default values:

Attribute | Example | Descriptioin | Default Value 
--- | --- | --- | ---
name | first_name | No Default Value
type | textarea | text
value | John | No Default Value
label | First Name | the value of name attribute converted to title format
id | first-name | No Default Value
class | first-name | No Default Value
container_class | first-name-container | No Default Value
placeholder | First Name | No Default Value
options | ["John Doe"] | No Default Value
attrs | onchange="inputChanged" | No Default Value
error | First Name is required | No Default Value
html | <button>Click Me</button> | html code to add if type attribute = raw_html | No Default Value

## Possible values for each attribute: