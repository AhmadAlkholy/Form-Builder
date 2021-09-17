class FormBuilder
{
	constructor(selector, schema=[]) {
		this.formEl = document.querySelector(selector);
		this.schema = schema;
		this.state = {};
		this.form(schema);
	}

	form = schema => {
		this.newHtml = schema.map(fieldData => {
			this.setState(fieldData);

			let html = '';

			if (this.state.type == 'hidden') {
				html = this.getInputHtml();
			}
			else if (this.state.type == 'checkbox') {
				html = this.getCheckboxHtml();
			}
			else if (this.state.type == 'raw_html') {
				html = this.state.html;
			}
			else {
	            html = this.getContainerHtml();
	            html += this.getLabelHtml();
	            html += '<div class="col-sm-12">';
	            html += this.getElementHtml();
	            
	            html += this.getError();
	            html += '</div></div>';
			}
            return html;
		});

		this.formEl.innerHTML = this.newHtml;
	}

	getError = () => this.state.error ? '<div class="alert alert-danger mt-1 mb-1">'+ this.state.error +'</div>' : '';

	getData = (obj, attr, defaultVal='') => obj[attr] || defaultVal;

	setState = fieldData => {
		this.state.type = this.getData(fieldData, 'type', 'text');
		this.state.name = this.getData(fieldData, 'name');
		this.state.label = this.getData(fieldData, 'label');
		this.state.id = this.getData(fieldData, 'id');
		this.state.className = this.getData(fieldData, 'class');
		this.state.containerClassName = this.getData(fieldData, 'container_class');
		this.state.value = this.getData(fieldData, 'value');
		this.state.placeholder = this.getData(fieldData, 'placeholder');
		this.state.options = this.getData(fieldData, 'options');
		this.state.attrbs = this.getData(fieldData, 'attrbs');
		this.state.error = this.getData(fieldData, 'error');
		this.state.html = this.getData(fieldData, 'html');
	}

	getContainerHtml = () => '<div class="form-group '+ this.state.containerClassName +'">';

	getLabelHtml = () => {
		const label = this.state.label || this.stringToTitle(this.state.name);
		return '<label for="'+this.state.id+'" class="col-sm-4">'+label+'</label>';
	}

	getElementHtml = () => {
		let html = '';
		switch(this.state.type){
			case 'text':
				html = this.getSelectHtml();
				break;
			case 'radio':
				html = this.getRadioHtml();
				break;
			case 'textarea':
				html = this.getTextAreaHtml();
				break;
			default:
				html = this.getInputHtml();

		}
		return html;
	}

	getSelectHtml = () => {

	}
	
	getRadioHtml = () => {

	}
	
	getTextAreaHtml = () => {

	}
	
	getInputHtml = () => '<input type="'+ this.state.type +'" name="'+ this.state.name +'" class="'+ this.state.className +'" placeholder="'+ this.state.placeholder +'" value="'+ this.state.value +'">';

	stringToTitle = (str) => {
	    const words = str.replace(/_/g, ' ').toLowerCase().split(' ');
	    return words.map( splitStr => word.charAt(0).toUpperCase() + word.substring(1) ).join(' ');
	}
}