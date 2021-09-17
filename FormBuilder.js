class FormBuilder
{
	constructor(selector, schema=[]) {
		this.formEl = document.querySelector(selector);
		this.schema = schema;
		this.state = {};
		this.newHtml = '';
		this.add(schema).setForm();
	}

	add = fieldData => {
		if (Array.isArray(fieldData)) {
			fieldData.forEach( this.add  );
			return this;
		}

		this.setState(fieldData);

		if (this.state.type == 'hidden') {
			this.newHtml += this.getInputHtml();
		}
		else if (this.state.type == 'raw_html') {
			this.newHtml += this.state.html;
		}
		else {
            this.newHtml += this.getContainerHtml();
            this.newHtml += this.getLabelHtml();
            this.newHtml += '<div class="col-sm-12">';
            this.newHtml += this.getElementHtml();
            
            this.newHtml += this.getError();
            this.newHtml += '</div></div>';
		}
		return this;
	}

	setForm = () => {
		this.formEl.innerHTML = this.newHtml;
		return this.reset();
	}

	update = () => {
		this.formEl.innerHTML += this.newHtml;
		return this.reset();
	}

	reset = () => {
		this.newHtml = '';
		return this;
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
		this.state.options = this.getData(fieldData, 'options', []);
		this.state.attrs = this.getData(fieldData, 'attrs');
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
			case 'select':
				html = this.getSelectHtml();
				break;
			case 'radio':
				html = this.getRadioHtml();
				break;
			case 'checkbox':
				html = this.getCheckboxHtml();
				break;
			case 'textarea':
				html = this.getTextAreaHtml();
				break;
			default:
				html = this.getInputHtml();

		}
		return html;
	}

	getCheckboxHtml = () => this.getRadioHtml();

	getSelectHtml = () => {
		let html = '<select '+ this.getElAttrs() +'>';
		html += this.state.options.map( option => {
			const name = option.name || option;
			const value = option.value || option;
			return '<option value="'+ value +'">'+ name +'</option>';
		})
		
		html += '</select>';
		return html;
	}
	
	getRadioHtml = () => {
		let html = '';
		this.state.options.forEach( option => {
			const name = option.name || option;
			const value = option.value || option;
			html += '<div class="form-check">';
			html += '<label class="form-check-label"><input type="'+ this.state.type +'" name="'+this.state.name+'" value="'+value+'" class="form-check-input '+this.state.className+'" '+this.state.attrs;
			if (value == this.state.value) {
				html += ' checked';
			}
			html += '>';
  			html += name + '</label></div>';
		});
		return html;
	}
	
	getTextAreaHtml = () => '<textarea '+ this.getElAttrs() +'>'+ this.state.value +'</textarea>';
	
	getInputHtml = () => '<input type="'+ this.state.type +'" '+ this.getElAttrs() +' value="'+ this.state.value +'">';

	stringToTitle = (str) => {
	    const words = str.replace(/_/g, ' ').toLowerCase().split(' ');
	    return words.map( word => word.charAt(0).toUpperCase() + word.substring(1) ).join(' ');
	}

	getElAttrs = () => {
		let html = ''; 
		if (this.state.name) html += 'name="'+this.state.name+'"';
		if (this.state.id) html += 'id="'+this.state.id+'"';
		if (this.state.className) html += 'class="'+this.state.className+'"';
		if (this.state.placeholder) html += 'placeholder="'+this.state.placeholder+'"';
		if (this.state.attrs) html += ' '+this.state.attrs;
		return html;
	}
}